import "../styles/ErrorPage.css";

const ErrorPage = () => {
    return (
        <div>
            <div className="error-component">
                <div className="error_code">404</div>
                <div className="error_description">
                    Ресурс не найден
                </div>
                <div className="error_additional">
                    Обратитесь к администратору
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
