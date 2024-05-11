
import React, { useEffect, useState, useRef, Fragment } from 'react';
import EmojiesDrop from './EmojiesDrop';

const NotesEditor = ({textareaRef,initialContent,setInitialContent,notesSetting}) => {


  const [activeFormatting, setActiveFormatting] = useState({ bold: false, underline: false, italic: false,copy: false,foreColor: '#1D4469',fontSize: 3,fontName: 'Poppins',formatblock:'p',wordcount: 0,charactercount:0 });
  const [paraHeadOpen, setParaHeadOpen] = useState(false);
  

  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g);
    const hexR = (+r).toString(16).padStart(2, '0');
    const hexG = (+g).toString(16).padStart(2, '0');
    const hexB = (+b).toString(16).padStart(2, '0');
    return `#${hexR}${hexG}${hexB}`;
  };
  
  

  const handleTextData = (event) => {
            
            const isBold = document.queryCommandState('bold');
            const isItalic = document.queryCommandState('italic');
            const isUnderline = document.queryCommandState('underline');
            const fontSize = document.queryCommandValue('fontSize');
            const fontName = document.queryCommandValue('fontName');
            const foreColor = document.queryCommandValue('foreColor');
            const hexColor = rgbToHex(foreColor);
            let formatblock = document.queryCommandValue('formatblock');

            if (formatblock === 'div' || formatblock === '') {
              document.execCommand('formatblock', false, 'p');
              formatblock = 'p';
            }

            const content = event.target.textContent;
            const words = content.trim().split(/\s+/).filter(word => word.length > 0);
            setActiveFormatting(prevState => ({
              ...prevState,
              bold: isBold,
              italic: isItalic,
              underline: isUnderline,
              fontSize: fontSize,
              fontName: fontName,
              foreColor: hexColor,
              formatblock : formatblock,
              wordcount : words.length,
              charactercount : content.length
          }));

          // if (content.length === 0) {
          //   event.target.textContent = 'Type or paste your content here!';
          // }

         

  }


  const handleButtonClick = (event) => {
    textareaRef.current.focus();
    const elementvalue = event.target.value;
    
    const button = event.currentTarget.getAttribute('data-styletag');
    document.execCommand(button, false,elementvalue);
    setActiveFormatting((prevState) => ({
      ...prevState,
      [button]: elementvalue ? elementvalue  : !prevState[button]
    }));

    if (button === 'copy') {
      setTimeout(() => {
        setActiveFormatting((prevState) => ({
          ...prevState,
          copy: false
        }));
      }, 1000);
    }
  };


  const handleParaHead = (value) => {
    textareaRef.current.focus();

    document.execCommand('formatblock', false,value);
    setActiveFormatting(prevState => ({
        ...prevState,
        formatblock: value,
    }));
    setParaHeadOpen(false);
  };

  

  return (


    <Fragment>

      <div className='relative'>

      <div
        role="textbox"
        contentEditable={true}
        ref={textareaRef}
        // dangerouslySetInnerHTML={{ __html: initialContent }}
        className={`text-sm border border-1d446933 w-full p-2 min-h-24 overflow-auto notesckeditor resize-y h-[127px]`}
        // onBlur={() => alert(1)}
        onKeyUp={handleTextData}
      >
      </div>

      {/* {activeFormatting.charactercount === 0 &&  <span className='absolute top-0 p-2 italic text-slate-400'>Type or paste your content here!</span>} */}
     

      </div>
     


      <div className={`border border-1d446933 flex justify-between p-1 ${notesSetting ? '' : 'hidden'}`}>
        <div className="pe-2 border-r border-B3B3B3 inline-block">
          <button type="button">
            <i className="bi bi-paperclip text-2xl text-8997A0"></i>
          </button>
        </div>
        <div className="flex items-center">

             <div className='text-xs px-4'>
                    <span className='mx-1'>Words : <span>{activeFormatting.wordcount}</span></span>
                    <span className='mx-1'>Characters : <span>{activeFormatting.charactercount}</span></span>
             </div>

          
          <EmojiesDrop textareaRef={textareaRef}/>

            <div className="inline-block text-left relative">

                <div>


                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize"
                    onClick={() => setParaHeadOpen(!paraHeadOpen)}
                    aria-expanded={paraHeadOpen}
                    aria-haspopup="true"
                  >
                    
                    {activeFormatting.formatblock}

                    <i class={`bi bi-${paraHeadOpen ? 'caret-up' : 'caret-down'} text-gray-400`}></i>
                  </button>

                </div>

                    {paraHeadOpen && (
                      <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex="-1">
                        <div className="py-1" role="none">
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'p' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('p')} tabIndex="-1">Paragraph</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h1' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h1')} tabIndex="-1">Heading 1</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h2' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h2')} tabIndex="-1">Heading 2</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h3' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h3')} tabIndex="-1">Heading 3</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h4' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h4')} tabIndex="-1">Heading 4</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h5' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h5')} tabIndex="-1">Heading 5</button>
                          <button className={`text-gray-700 block w-full px-4 py-2 text-left text-sm ${activeFormatting.formatblock === 'h6' ? 'bg-1D4469  text-white' : ''}`} onClick={() => handleParaHead('h6')} tabIndex="-1">Heading 6</button>

                        </div>
                      </div>
                    )}
            </div>



{/* <div className='mx-2'>

            <select className='form-select w-[130px] px-2'  data-styletag="fontName" onChange={handleButtonClick} value={activeFormatting.fontName}>
                   <option value={"Poppins"}>Poppins</option>
                   <option value={"Be-Vietnam"}>Be Vietnam</option>
                   <option value={"nunito"}>nunito</option>
            </select>

</div> */}

          <div className='mx-2'>

            <select className='form-select w-[60px] px-2' data-styletag="fontSize"  onChange={handleButtonClick} value={activeFormatting.fontSize}>
                   <option value={"1"}>1</option>
                   <option value={"2"}>2</option>
                   <option value={"3"}>3</option>
                   <option value={"4"}>4</option>
                   <option value={"5"}>5</option>
                   <option value={"6"}>6</option>
                   <option value={"7"}>7</option>
            </select>
      

          </div>




          <div className='mx-2 relative'>
              <input type="color" id="favcolor" class="color-input" name="favcolor" data-styletag="foreColor" value={activeFormatting.foreColor} onChange={handleButtonClick} />
              <div id="custom-colorbox-1" class={`customcolorbox bg-[${activeFormatting.foreColor}]`}>
                  <i class="bi bi-palette text-white "></i>
              </div>
          </div>
          

          <button className={`mx-2 ${activeFormatting.bold && 'text-2999BC bg-EAEAEA rounded'}`} data-styletag="bold" onClick={handleButtonClick}>
               <i class="bi bi-type-bold text-xl"></i>
          </button>
          <button className={`mx-2  ${activeFormatting.underline && 'text-2999BC bg-EAEAEA rounded'}`} data-styletag="underline"  onClick={handleButtonClick} >
             <i class="bi bi-type-underline text-xl"></i>
          </button>
          <button className={`mx-2  ${activeFormatting.italic && 'text-2999BC bg-EAEAEA rounded'}`} data-styletag="italic" onClick={handleButtonClick}>
             <i class="bi bi-type-italic text-xl"></i>
          </button>

          <button className={`mx-2`} data-styletag="copy" onClick={handleButtonClick}>
             <i class="bi bi-copy text-xl"></i>
          </button>

          {activeFormatting.copy && (
            <div className="absolute translate-y-[-44px] translate-x-[32rem] mr-1 p-1 px-2 bg-1D4469 text-white rounded">
              Copied
            </div>
          )}

          <button className={`mx-2`} data-styletag="undo" onClick={handleButtonClick}>
              <i class="undo-icon"></i>
          </button>

          <button className={`mx-2`} data-styletag="redo" onClick={handleButtonClick}>
              <i class="redo-icon"></i>
          </button>




        </div>
      </div>

    </Fragment>

  );
};

export default NotesEditor;
