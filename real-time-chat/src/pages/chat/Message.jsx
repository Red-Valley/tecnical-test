import PropTypes from 'prop-types';
import { DateTime } from "luxon";

function Message({ author, message, create_at }) {
    return (
        <div className="bloc  w-4/5 bg-white rounded-lg p-2 text-gray-700 shadow-lg max-w-xl mt-3 mx-auto">
            <div className="flex jusntify-start font-bold">{author}</div>
                <div className="text-gray-500 font-normal w-full text-justify">{message}</div>
            <div className="flex justify-end italic font-normal text-sm w-full">{DateTime.fromISO(create_at).toFormat('ff')}</div>
        </div>
    )
}
Message.propTypes = {
    message: PropTypes.string,
    author: PropTypes.string,
    create_at: PropTypes.string
}
export default Message;