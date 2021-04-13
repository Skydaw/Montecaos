import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'


const Politique = () => {
    
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const[redirect,setRedirect]=useState("")

    const submit=async(e)=>{
        e.preventDefault();
        await fetch('http://localhost:8000/api/blog',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title,
                body,
                date,
            })
        })
        setRedirect(true)
    
    }
    if(redirect){
    return <Redirect to="/"/>
    }
    return (
        <div>
        <form onSubmit={submit}>
            <div>
                <label for="name">Titre de l'article</label>
                <input type="text" className="form-control"required placeholder=""id='username-input'value={title}
                onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div>
                <label for="desc">Image Description</label>
                <input type="text" className="form-control"required placeholder=""id='username-input'value={body}
                onChange={e=>setBody(e.target.value)}/>
            </div>
            <div>
                <label for="name">Date</label>
                <input type="text" className="form-control"required placeholder=""id='username-input'value={date}
                onChange={e=>setDate(e.target.value)}/>
            </div>

            {/* <div>
                <label for="image">Upload Image</label>
                <input type="file" id="image"
                       name="image" value="" onChange={e=>setImg(e.target.value)} />
            </div> */}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}

export default Politique
