import React, { useEffect, useState } from 'react'
import note from '../images/note.jpg'

// Get data from local Storage
const getLocalItems=()=>{
    let list=localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    }else{
        return[]
    }
}

const ToDoList = () => {

    const [InputData, setInputData] = useState();
    const [Items, setItems] = useState(getLocalItems())
    const [ToggleSubmit, setToggleSubmit] = useState(true)
    const [IsEditItem, setIsEditItem] = useState(null)

    const addItem=()=>{
        if(!InputData){
            alert('enter some items')
        }else if(InputData && !ToggleSubmit){
            setItems(
                Items.map((elem)=>{
                    if(elem.id === IsEditItem){
                        return{...elem, name:InputData}
                    }
                    return elem
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setIsEditItem(null)
        }else{
            const allInputData={ id: new Date().getTime().toString(), name:InputData}
            setItems([...Items,allInputData])
            setInputData('')
        }    
    }

    const deleteItems=(index)=>{
        const updatedItems = Items.filter((elem)=>{
            return index !== elem.id;
        })
        setItems(updatedItems)
    }

    const editItems=(id)=>{
        let newEditItem = Items.find((elem) => {
            return elem.id === id
        })
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setIsEditItem(id)
    }

    const removeAll=()=>{
        setItems([])
    }

      // Add to localStorage
      useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(Items))
    }, [Items]);

    return (
        <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src={note} alt="noteLogo" />
                    <figcaption>Add your list here 📝</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder=' ✍️ Add Items...' 
                        value={InputData}
                        onChange={(e)=>setInputData(e.target.value)}
                    />
                    {
                        ToggleSubmit ? <i className="fa fa-plus add-btn" title='Add Items' 
                    onClick={addItem}></i> : <i className="far fa-edit add-btn" title='update Items' 
                    onClick={addItem}></i>
                    }
                    
                </div>
                <div className='showItems'>

                    {
                        Items.map((elem)=>{
                            return(
                                <div className='eachItem' key={elem.id}>
                                    <h3>{elem.name}</h3>
                                   <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title='Edit Items' onClick={()=>editItems(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title='Delete Items' onClick={()=>deleteItems(elem.id)}></i>
                                   </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>Check List</span></button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ToDoList
