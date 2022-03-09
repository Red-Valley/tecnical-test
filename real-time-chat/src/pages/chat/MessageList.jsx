import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';

function MessageList() {
    let messages = useSelector(state => state.messages);
    return (
        <section className="message-list bloc w-full font-bold bg-amber-50 h-[90%] overflow-auto pb-2 ">
                    {messages &&
                        messages.map((message, i) => {
                            if (message.create_at) {
                                return(<Message key={message.id} {...message} />)
                            }
                        })
                    }
        </section>
    )
}
MessageList.propTypes = {
    message: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            author: PropTypes.string,
            message: PropTypes.string,
            create_at: PropTypes.string
        })
    )
}

export default MessageList;