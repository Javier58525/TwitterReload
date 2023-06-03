import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authcontext';

const Tweets = () => {
  const { user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tweets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTweets(data);
        } else {
          console.log('Error al obtener los tweets');
        }
      } catch (error) {
        console.log('Error en el servidor');
      }
    };

    fetchTweets();
  }, []);

  const handleCreateTweet = async (content) => {
    try {
      const response = await fetch('http://localhost:3000/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const data = await response.json();
        setTweets([...tweets, data.tweet]);
      } else {
        console.log('Error al crear el tweet');
      }
    } catch (error) {
      console.log('Error en el servidor');
    }
  };

  return (
    <div>
      <h2>Tweets</h2>
      <div>
        <h3>Crear Tweet</h3>
        <TweetForm onCreateTweet={handleCreateTweet} />
      </div>
      <div>
        <h3>Tus Tweets</h3>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} content={tweet.content} />
        ))}
      </div>
    </div>
  );
};

const TweetForm = ({ onCreateTweet }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTweet(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu tweet"
        maxLength={300}
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
};

const Tweet = ({ content }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default Tweets;
