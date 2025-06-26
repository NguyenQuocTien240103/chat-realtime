import ListComponent from './component/List';
import Conversation from './component/Conversation';

const Message = () => {
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '25%', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
          <ListComponent />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '75%', overflowY: 'hidden' }}>
          <Conversation />
        </div>
      </div>
    );
  };

export default Message;