import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../slices/postsApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const CreatePostScreen = () => {

    const userInfo = useSelector(state => state.auth.userInfo);
    const [ file, setFile ] = useState(null);
    const [ description, setDescription ] = useState('');
    const [ createPost, { isLoading } ] = useCreatePostMutation();

    const submitHandler = async (e) => {
        e.preventDefault(); 
        try {
            const formData = new FormData();
            formData.append('content', file);
            formData.append('url', file.name);
            formData.append('description', description);
            formData.append('_id', userInfo._id);

            console.log(`User info: ${userInfo._id}, File: ${file}, Description: ${description}`)
            const res = await createPost(formData).unwrap();
            toast.success(res.message);
        } catch (err) {
            console.log('Error creating post: ', err);
            toast.error(`Error: ${err.data.message || err}`);
        }
    }

    return (
        <div>
            <FormContainer title={'Create Post.'} >
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='content'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control 
                            type='file'
                            placeholder='Upload Image'
                            className='w-25'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as='textarea'
                            placeholder='Enter description'
                            className='w-25'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button 
                        type='submit' 
                        variant='primary'
                        className='w-auto d-flex flex-column justify-content-center align-items-center mt-5'
                        >Create
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default CreatePostScreen;