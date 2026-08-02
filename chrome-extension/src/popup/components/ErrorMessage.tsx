import '../styles/ErrorMessage.css';

interface ErrorMessageProps {

    message: string;

    onRetry?: () => void;

}

const ErrorMessage = ({

    message,

    onRetry

}: ErrorMessageProps) => {

    return (

        <div
            className="error-box"
        >

            <h4>

                Something went wrong

            </h4>

            <p>

                {message}

            </p>

            {

                onRetry &&

                <button

                    onClick={onRetry}

                >

                    Retry

                </button>

            }

        </div>

    );

};

export default ErrorMessage;