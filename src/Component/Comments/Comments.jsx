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
        try {
            await axios.delete(`http://localhost:8000/api/comments/${commentId}`);
            fetchData();
            setIsShowDeleteModal(false);
            toast.error('کامنت با موفقیت حذف شد');
        } catch (error) {
            console.error(error);
            setIsShowDeleteModal(false);
            toast.error('خطا در حذف کامنت');
        }
    }

    // Editcomments
    const updateCommentInfo = async (e) => {
        e.preventDefault()
        const editCommentbody = {
            body: commentBody
        }
        try {
            await axios.put(`http://localhost:8000/api/comments/${commentId}`, editCommentbody);
            fetchData();
            setIsShowEditModal(false);
            toast.success('کامنت با موفقیت ویرایش شد');
        } catch (error) {
            console.error(error);
            toast.error('خطا در ویرایش کامنت');
        }
    }

    // Acceptcomment
    const cancelAcceptComments = () => { setIsShowAcceptModal(false) }

    const submitAcceptComments = async () => {
        try {
            await axios.post(`http://localhost:8000/api/comments/accept/${commentId}`);
            fetchData();
            setIsShowAcceptModal(false);
            toast.success('کامنت با موفقیت تایید شد');
        } catch (error) {
            console.error(error);
            setIsShowAcceptModal(false);
            toast.error('خطا در تایید کامنت');
        }
    }

    // Rejectcomment
    const cancelRejectComments = () => { setIsShowRejectModal(false) }

    const submitRejectComments = async () => {
        try {
            await axios.post(`http://localhost:8000/api/comments/reject/${commentId}`);
            fetchData();
            setIsShowRejectModal(false);
            toast.success('کامنت با موفقیت رد شد');
        } catch (error) {
            console.error(error);
            setIsShowRejectModal(false);
            toast.error('خطا در رد کامنت');
        }
    }


    // Answercomments
    const answerCommentUsers = async (e) => {
        e.preventDefault()

        const answer = {
            answer: commentAnswer
        }
        try {
            await axios.post(`http://localhost:8000/api/comments/${commentId}`, answer);
            setIsShowAnswerModal(false);
            setCommentAnswer('');
            toast.success('پاسخ با موفقیت ارسال شد');
        } catch (error) {
            console.error(error);
            toast.error('خطا در ارسال پاسخ');
        }
    }



    return (
        <div className='mt-5 md:mt-10 p-5'>
            <h1 className='mb-5 text-sm md:text-xl'>کامنت ها</h1>
            {allData.length ? (
                <div className='overflow-x-auto'>
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
                </div>
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
                    <p className='text-sm md:text-lg'>{infosComment.body}</p>
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
                        className='text-sm md:text-lg mt-10'
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
                        className='text-sm md:text-lg mt-10'
                        onChange={(e) => setCommentAnswer(e.target.value)}>
                    </textarea>
                </EditModal>
            }

            <ToastContainer />

        </div>
    );
}

export default Comments;
