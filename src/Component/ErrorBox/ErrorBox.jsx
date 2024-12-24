const ErrorBox =  ({msg})  => {
    return (
        <div className="bg-red-700 text-white mt-5 p-3 text-2xl text-center ">
            <h1>{msg}</h1>
        </div>
     );
}

export default ErrorBox;
