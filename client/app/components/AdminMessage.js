import { useEffect } from 'react';
import Pusher from 'pusher-js';

const AdminMessages = () => {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('admin_message');
    channel.bind('admin.message', function (data) {
      if (data.status === 'success') {
        alert(`✅ Success: ${data.message}`);
      } else if (data.status === 'error') {
        alert(`❌ Error: ${data.message}`);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return <div>Listening for Admin Messages...</div>;
};

export default AdminMessages;
