const addNewLine = (data:any) =>{
  const newline =[...data,{id:data.length + 1,}]
  return newline
}

const removeLine = (id:string,obj:any) =>{
  if(obj.length > 1){
    const filteredObj =  obj.filter((object:any) =>{ return object.id !== id})
    return filteredObj
  }

  return id
}

export { removeLine, addNewLine }
