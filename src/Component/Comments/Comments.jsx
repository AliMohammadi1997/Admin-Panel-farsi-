
import { useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal';
import UseGetFetch from '../../Hooks/UseGetFetch';
import ErrorBox from '../ErrorBox/ErrorBox'
import axios from 'axios';
import DetailsModal from '../DetailsModal/DetailsModal';
import { toast, ToastContainer } from 'react-toastify';
import EditModal from '../EditModal/EditModal';


const Comments = () => {
    const [commentId, setCommentId] = useState(null)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [isShowAnswerModal, setIsShowAnswerModal] = useState(false)
    const [commentAnswer, setCommentAnswer] = useState('')
    const [infosComment, setInfosComment] = useState({})
    const [commentBody, setCommentBody] = useState('')
    const { allData, fetchData } = UseGetFetch('http://localhost:8000/api/comments/')


    const closeDetailsModal = () => { setIsShowDetailsModal(false) }

    // deletecommens
    const cancelDeleteComments = () => { setIsShowDeleteModal(false) }

    const acceptDeleteComment = async () => {
        await axios.delete(`http://localhost:8000/api/comments/${commentId}`)
            .then(res => {
                console.log(res);
                fetchData();
                setIsShowDeleteModal(false);
                toast.error('کامنت با موفقیت حذف شد')
            })


    }

    // Editcomments
    const updateCommentInfo = (e) => {
        e.preventDefault()
        const editCommentbody = {
            body: commentBody
        }
        axios.put(`http://localhost:8000/api/comments/${commentId}`, editCommentbody)
            .then(res => {
                console.log(res);
                fetchData();
                setIsShowEditModal(false);
                toast.success('کامنت با موفقیت ویرایش شد');
            })
    }

    // Acceptcomment
    const cancelAcceptComments = () => { setIsShowAcceptModal(false) }

    const submitAcceptComments = () => {
        axios.post(`http://localhost:8000/api/comments/accept/${commentId}`)
            .then(res => {
                console.log(res);
                fetchData();
                setIsShowAcceptModal(false)
                toast.success('کامنت با موفقیت تایید شد');
                console.log('کامنت تایید شد');
            })

    }

    // Rejectcomment
    const cancelRejectComments = () => { setIsShowRejectModal(false) }

    const submitRejectComments = () => {

        axios.post(`http://localhost:8000/api/comments/reject/${commentId}`)
            .then((res) => {
                console.log(res);
                fetchData()
                setIsShowRejectModal(false)
                toast.success('کامنت با موفقیت رد شد')
            })
    }


    // Answercomments
    const answerCommentUsers = (e) => {
        e.preventDefault()

        const answer = {
            answer: commentAnswer
        }
        axios.post(`http://localhost:8000/api/comments/${commentId}`, answer)
            .then(res => {
                console.log(res);
                setIsShowAnswerModal(false)
                setCommentAnswer('')
                toast.success('پاسخ با موفقیت ارسال شد')
            })
    }



    return (
        <div className='mt-10 p-5'>
            <h1 className='mb-5 text-3xl'>کامنت ها</h1>
            {allData.length ? (
                <table className="cms-table">
                    <thead>
                        <tr>
                            <th>اسم کاربر</th>
                            <th>محصول</th>
                            <th>کامنت</th>
                            <th>تاریخ</th>
                            <th>ساعت</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allData.map((comment) => (
                                <tr key={comment.id}>
                                    <td>{comment.userID}</td>
                                    <td>{comment.productID}</td>
                                    <td><button
                                        onClick={() => {
                                            setIsShowDetailsModal(true);
                                            setInfosComment(comment)
                                        }}
                                    >
                                        دیدن متن
                                    </button>
                                    </td>
                                    <td>{comment.date}</td>
                                    <td>{comment.hour}  </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setCommentId(comment.id);
                                                setIsShowDeleteModal(true)
                                            }}
                                        >حذف
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCommentBody(comment.body);
                                                setIsShowEditModal(true);
                                                setCommentId(comment.id)
                                            }}
                                        >ویرایش
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsShowAnswerModal(true)
                                                setCommentId(comment.id)
                                            }}
                                        >پاسخ
                                        </button>

                                        {/* Accept & Reject Comment */}

                                        {comment.isAccept === 0 ?
                                            <button
                                                onClick={() => {
                                                    setIsShowAcceptModal(true);
                                                    setCommentId(comment.id)
                                                }}
                                            >تایید
                                            </button>
                                            :
                                            <button
                                                onClick={() => {
                                                    setIsShowRejectModal(true);
                                                    setCommentId(comment.id)
                                                }}
                                            >رد
                                            </button>


                                        }

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            )
                : (
                    setTimeout(() => {
                        <ErrorBox msg="هیچ کامنتی یافت نشد" />

                    }, 1000)
                )
            }



            {/* deleteModal */}

            {isShowDeleteModal &&
                <DeleteModal
                    title='آیا از حذف کامنت مطمئن هستید؟'
                    submitAction={acceptDeleteComment}
                    cancelAction={cancelDeleteComments}
                />
            }

            {/* DetailsModal */}

            {isShowDetailsModal &&
                <DetailsModal onColse={closeDetailsModal}>
                    <p >{infosComment.body}</p>
                    <button onClick={closeDetailsModal} className='product-table-btn w-full mt-10'> بستن </button>
                </DetailsModal>
            }

            {/* EditModal */}

            {isShowEditModal &&
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={updateCommentInfo}>
                    <textarea
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        className='mt-10 text-red-700'
                    />

                </EditModal>
            }

            {/* AcceptModal */}

            {isShowAcceptModal &&
                <DeleteModal
                    title='آیا از تایید کامنت مطمئن هستید؟'
                    submitAction={submitAcceptComments}
                    cancelAction={cancelAcceptComments}
                />
            }

            {/* RejectModal  */}

            {isShowRejectModal &&
                <DeleteModal
                    title='آیا از رد کردن کامنت مطمئن هستید؟'
                    submitAction={submitRejectComments}
                    cancelAction={cancelRejectComments}
                />
            }

            {/* AnswerModal  */}

            {isShowAnswerModal &&
                <EditModal
                    onClose={() => setIsShowAnswerModal(false)}
                    onSubmit={answerCommentUsers}>
                    <textarea
                        value={commentAnswer}
                        onChange={(e) => setCommentAnswer(e.target.value)}>

                    </textarea>
                </EditModal>
            }

            <ToastContainer />

        </div>
    );
}

export default Comments;
