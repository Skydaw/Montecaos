import React,{useState} from 'react'

const Cgv  = () => {

    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const[img,setImg]=useState("")

    const submit = async e => {
        const file = document.getElementById("inputGroupFile01").files;
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", file[0]);
        console.log(img)

        await fetch("http://localhost:5000/api/blog",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title,
                body,
                date,
                img
              })
          
          });
      await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData
      }).then(r => {
        console.log(r);
      });
  
      
        document
          .getElementById("img")
          .setAttribute("src", `http://localhost:5000/${file[0].name}`);
        
      }
    
  
      return (
        <div className="container">
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
                <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={e=>setImg(e.target.value.substr(12))}
                    />

                
                <button type="submit">Submit</button>
            </form>
          <img
            id="img" alt=''style={{display: "block"}}
          ></img>
        </div>
      );
    }
  

export default Cgv
