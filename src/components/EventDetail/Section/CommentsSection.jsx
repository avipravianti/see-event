import { Typography, Box, TextField } from '@mui/material';
import yoshua from './../assets/yoshua.png';
// import agnes from './../assets/agnes.png';
// import bambang from './../assets/bambang.png';
// import InputComment from "../Input/InputComment";
// import ButtonComment from "../Button/ButtonComment";
import { useState, useEffect } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material';
import axios from 'axios';

const CommentsSection = () => {
  const [listComment, setListComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const getComment = async () => {
    try {
      const res = await axios.get(`https://timcevent.herokuapp.com/comments`);
      setListComment(res.data.data.reverse());
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  

  const addComment = (data) => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("userId", data);
    formdata.append("eventId", data);
    formdata.append("comment", data);
    axios
      .post(
        `https://timcevent.herokuapp.com/comments`, formdata,
        {
          Headers: {
            token,
          },
        },
        {
          comment: newComment,
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        const commentToAdd = { comment: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment('');
      });
  };

  return (
    <Box sx={{ width: '600px' }}>
      <Typography
        sx={{
          fontFamily: 'Noto Sans',
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '48px',
        }}
      >
        Comments
      </Typography>
      {listComment.map((item, key) => (
        <>
          <Box sx={{ display: 'flex', marginTop: '32px' }}>
            <img src={yoshua} alt="" />
            <Box sx={{ marginLeft: '16px' }}>
              <Typography
                sx={{
                  fontFamily: 'Noto Sans',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Agnes Mo
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Noto Sans',
                  fontSize: '12px',
                }}
              >
                4 Hours ago
              </Typography>
            </Box>
          </Box>

          <Typography key={key} sx={{ marginTop: '16px', fontFamily: 'Noto Sans' }}>
            {item.comment}
          </Typography>
        </>
      ))}

      {/* <Box sx={{display:'flex', marginTop: '32px'}} >
                    <img src={agnes} alt="" />
                    <Box sx={{marginLeft: '16px'}}>
                        <Typography
                        sx={{
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }} >
                            Agnes Mo
                        </Typography>
                        <Typography 
                        sx={{
                            fontFamily: 'Noto Sans',
                            fontSize: '12px'
                        }} >
                            4 Hours ago
                        </Typography>
                    </Box>
                </Box>                
                <Typography sx={{marginTop: '16px', fontFamily: 'Noto Sans'}}>
                    Hi pratur! I like your event, I already sent you an email about my upcoming event, could you hosted my event?
                </Typography>

                <Box sx={{display:'flex', marginTop: '32px'}} >
                    <img src={bambang} alt="" />
                    <Box sx={{marginLeft: '16px'}}>
                        <Typography
                        sx={{
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }} >
                            Bambang Prakoso
                        </Typography>
                        <Typography 
                        sx={{
                            fontFamily: 'Noto Sans',
                            fontSize: '12px'
                        }} >
                            20 Minutes ago 
                        </Typography>
                    </Box>
                </Box>                
                <Typography sx={{marginTop: '16px', fontFamily: 'Noto Sans'}}>
                    Good Event!
                </Typography> */}

      {/* <InputComment  /> */}
      <TextField
        multiline
        placeholder="Enter your comment here"
        rows={4}
        value={newComment}
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
        sx={{
          width: '496px',
          marginTop: '16px',
        }}
      />
      {/* <ButtonComment /> */}
      <Button
        variant="contained"
        onClick={addComment}
        startIcon={<ChatBubbleOutlineIcon />}
        sx={{
          color: 'white',
          marginTop: '16px',
          padding: '10px',
          backgroundColor: '#214457',
          border: '3px solid',
          borderRadius: '30px',
          fontFamily: 'Noto Sans',
          boxShadow: 'none',
          width: '184px',
          marginLeft: '320px',
          textTransform: 'unset',
          '&: hover': {
            boxShadow: 'none',
            backgroundColor: '#4d6978',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
export default CommentsSection;
