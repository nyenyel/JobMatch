import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { baseURL, crud } from '../resource/api'
import Echo from 'laravel-echo';
import Cookie from 'js-cookie'
import axios from 'axios'
import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, Timestamp} from 'firebase/firestore'
import {db} from '../../firebase-config'
import Loading from '../cards/Loading';


export default function ChatComponent({room}) {
    const {user, apiClient ,token} = useContext(AppContext)
    const [chatroom, setChatroom] = useState(room)
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const {receiver} = useParams()
    const [message, setMessage] = useState({
        sender_id: user?.data?.id,
        receiver_id: receiver,
        chatroom: `cr-${user?.data?.id}-${receiver}`,
        message: ''
    });
    const [conversation, setConversation] = useState()
    const conversationEndRef = useRef(null);

    // Scroll to the bottom when the conversation updates
    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    const handleSend = async (e) => {
        if(room){
            try {
                setSending(true)
                const messagesRef = collection(db, "chatroom", room, 'messages');
                const data = {
                    message: message.message,
                    sender: user.data.id,
                    timestamp: Timestamp.fromDate(new Date()) 
                }
                console.log(data)
                const response = await addDoc(messagesRef, data);
                setMessage((prev) => ({
                    ...prev, 
                    message: ''
                }))
            } catch (error) {
                console.error(error)
            } finally{
                setSending(false)
            }
        }
    }
    const handleChange = (e) => {
        const {value, name} = e.target
        setMessage((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const getData = async () => {
        setLoading(true)
        try{
            
            // Use getDocs() instead of getDoc() to fetch all documents in the 'messages' collection
            const messagesRef = collection(db, "chatroom", room, 'messages');
            const q = query(messagesRef, orderBy("timestamp", "asc"));
            const querySnapshot = await getDocs(q);
            const updateConversation = []
            querySnapshot.forEach((doc) => {
                updateConversation.push({
                    msg: doc.data().message, 
                    sender: doc.data().sender, 
                    timestamp: doc.data().timestamp
                })
            });
            setConversation(updateConversation)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (user?.data?.id && receiver) {
            const userID = user.data.id
            setMessage((prev) => ({
                ...prev,
                sender_id: user.data.id,
                chatroom: `cr-${userID}-${receiver}`,
            }));
            if(room){
                getData()
            }
        }
        if(room) {
            const messagesRef = collection(db, "chatroom", room, 'messages');

            const unsub = onSnapshot(query(messagesRef, orderBy("timestamp", "asc")), orderBy("timestamp", "asc"), (querySnapshot) => {
                const updateConversation = []
                querySnapshot.forEach((doc) => {
                    updateConversation.push({msg: doc.data().message, sender: doc.data().sender, timestamp: doc.data().timestamp})
                })
                setConversation(updateConversation)
            })
            return () => unsub()
        }

    }, [user?.data?.id, receiver, token, room]);

    return (
        <>
        {loading && <Loading />}
        <div className="flex flex-col h-full bg-white">
            {/* Loading Spinner */}

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {conversation?.map((item, index) => (
                    <ChatBox data={item} currentUser={user?.data?.id} key={index} />
                ))}
                <div ref={conversationEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 flex items-center border-t">
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                    disabled={sending}
                    name="message"
                    onChange={handleChange}
                    value={message.message || ''}
                    type="text"
                    placeholder="Message"
                    className="w-full p-4 border rounded-md"
                />
                <button
                    onClick={handleSend}
                    disabled={sending}
                    className="bg-prc text-white p-4 px-4 rounded-r-md w-16"
                >
                    {!sending ? 'Send' : '....'}
                </button>
            </div>
        </div>
        </>
    );
}

function ChatBox({data, currentUser}){
    const isTheSender = currentUser === data.sender
    const date = data.timestamp.toDate()
    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    return (
        <>
        <div className='flex'>
            {isTheSender && <div className='flex-1'/>}
            <div className={`${isTheSender ? 'bg-prc text-white text-right': 'bg-gray-300'} flex flex-col p-4 flex-none rounded-md max-w-52`}>
                {data.msg}
                <div className='text-xs opacity-30'>{time}</div>
            </div>
        </div>
        </>
    )
}