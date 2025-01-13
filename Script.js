const uploadBox = document.querySelector(".upload-box");
previewImg = uploadBox.querySelector("img");
// querySelector: Selects the first element with the class "example-class"
// uploadBox is variable which cannot we changed. 

fileInput = uploadBox.querySelector("input");
//fileInput is variable and it can declared globally
//to declared in scope we can use let or var

widthInput = document.querySelector(".width input");
heightInput = document.querySelector(".height input");
ratioInput = document.querySelector(".ratio input");
downloadBtn = document.querySelector(".download-button")
qualityInput = document.querySelector(".quality input")


let ogImageRatio;

const loadFile = (e)=>{
    const file = e.target.files[0]; //getting the user selected file
     if(!file) return; //return if user does not select the file
    previewImg.style.display ="flex"
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src 
    previewImg.addEventListener("load",()=>{
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth/previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })

    console.log(file);
}

// $ The loadFile function is defined with an event parameter (e).
// $ Inside the loadFile function:
// $ It attempts to retrieve the first selected file from the files property of the target element in the event object.
// $ If no file is found, the function returns early.
// $ Otherwise, it logs the details of the file object to the console.
widthInput.addEventListener("keyup",()=>{
    //getting height according to the ratio checkbox status
    const height = ratioInput.checked? widthInput.value/ogImageRatio:heightInput.value;
    //or 
    //const height = ratioInput.checked? heightInput.value*ogImageRatio:widthInput.value;

    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup",()=>
{
    const width = ratioInput.checked? heightInput.value/ogImageRatio:widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = ()=>{
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");
    
    const imgQuality = qualityInput.checked? 0.1:1.0;

    //setting canvas height & width according to input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    //drawing the user selected image onto the canvas 
    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);


    // passing canvas user selected image onto the canvas 
    a.href = canvas.toDataURL("image/jpeg",imgQuality); 
    a.download = new Date().getTime();//passing current time as download value
    a.click(); //clicking <a> element so the file download
}

downloadBtn.addEventListener("click",resizeAndDownload);
fileInput.addEventListener("change", loadFile);

// $ he addEventListener method is used to attach an event listener to the fileInput element.
// $ The event listener is triggered when the value of the input element changes, indicating that a file has been selected.
// $ Upon the change event, the loadFile function is called with the event object passed as an argument.

uploadBox.addEventListener("click", ()=>fileInput.click());

// The code uploadBox.addEventListener("click", () => fileInput.click()); 
// sets up an event listener for the uploadBox element. When the uploadBox element is 
// clicked, the code inside the function (fileInput.click()) is executed. 
// This code programmatically triggers a click event on the fileInput element, 
// which effectively opens the file selection dialog box for the user to choose a file to upload

//addEventListener 
// It takes two parameters:

// The type of event you want to listen for, such as "click," "mouseover," "keydown," etc.
// The function that should be executed when the event occurs.
// When the specified event occurs on the specified element,
//  the function provided as the second parameter is executed.

