import '../styles/LoadingIndicator.css'

interface LoadingIndicatorProps {

    message?: string;

}

function LoadingIndicator({

    message = "Thinking..."



}: LoadingIndicatorProps) {

    return (

        <div className="loading-container">

            <div className="spinner"></div>

            <span className="loading-text">

                {message}

            </span>

        </div>

    );

}

export default LoadingIndicator;