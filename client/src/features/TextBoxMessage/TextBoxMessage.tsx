import TextField from '@mui/material/TextField';
export default function TextBoxMessage() {
  return (
    <div className='p-5'>
           <TextField
          label="Write a Message"
          multiline
          fullWidth
          rows={4}
          defaultValue=""
        />
    </div>
  );
}
