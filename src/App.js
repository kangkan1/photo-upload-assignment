import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      validFile:false,
      fileSelected:false,
      dimensions: {},
      imageName:null,
      type:null,
      size:0
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }
  componentDidMount(){
    document.title = "Photo upload"
  }

  renderImage = () =>{
    if(this.state.validFile){
      const {width, height} = this.state.dimensions;
      //var url = window.location.pathname
      return(<div>
              <p style={{fontFamily: 'cursive'}}>Image preview: </p>
              <img src={this.state.image} 
                    style={{width:'30%', height:'30%', border:'10px solid #ddd',
                            maxWidth:'90%', maxHeight: '90%', marginTop:'10px',
                            padding:'10px'}}/>
              <div style={{border:'1px solid #eee', boxShadow:'0 5px 6px #ccc',
                           height:'90%', width:'90%', marginTop:'10px', 
                           display:'table', margin:'0 auto'}}>    
                <p style={{fontFamily: 'cursive'}}>Image name: {this.state.imageName}</p> 
                <p style={{fontFamily: 'cursive'}}>Image type: {this.state.type.substr(this.state.type.lastIndexOf("/") + 1)}</p>                      
                <p style={{fontFamily: 'cursive'}}>Image height: {height}</p>
                <p style={{fontFamily: 'cursive'}}>Image width: {width}</p>
                <p style={{fontFamily: 'cursive'}}>Image size: {this.state.size} bytes</p>
              </div>  
            </div>);
    }else if(this.state.fileSelected){
       return(<p style={{fontFamily: 'cursive', color:'red'}}>
                This is not a valid image file
              </p>);
    }
  }
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
            fileSelected:true
          });
      let imag = new Image()
      imag.src = window.URL.createObjectURL(event.target.files[0])
      imag.onload = () => {
           this.setState({
              dimensions:{height:imag.height, width:imag.width}
            
          });  
      };
      let img = event.target.files[0];
      var url = img.name
      const file = event.target.files[0];
      const fileType = file['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(fileType)) { 
          this.setState({
            image: URL.createObjectURL(img),
            validFile: true,
            imageName: img.name,
            type: img.type,
            size: img.size,
          });         
      }else {
        this.setState({
            image: null,
            validFile: false
          });
        alert('Invalid file. Please choose file of type .png, .jpeg, .jpg')
      }
      
    }
  };

  render() {
    return (
      <div style={{width:'67%', margin:'auto', border:'1px solid #eee', 
                   boxShadow:'0 5px 6px #ccc', padding:'16px', textAlign:'center',
                   marginTop:'10px'}}>
            
            <p style={{fontFamily: 'cursive', border: '2px solid powderblue',
                      width:'95%', display:'table', margin:'0 auto', 
                      boxShadow:'0 4px 5px #ccc'}}>Select an image</p>
            <br />
            <form>
              <label for="fname">Choose a photo: </label>
              <input type="file" name="myImage" onChange={this.onImageChange} 
                      style={{border:'1px solid #eee', width:'70%',
                              boxShadow:'0 2px 3px #ccc', padding:'1.1em',
                              boxSizing: 'borderBox', borderRadius:'1.1em'}}/>
            </form> 
            <div> 
            {this.renderImage()}
            </div>
           
      </div>
    );
  }
}

export default App;

