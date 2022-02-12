/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
*/


/**
 * Define Global Variables
*/

const navigationMenu = document.querySelector('#navbar__list');
const navigationSections = document.querySelectorAll('section');

/**
 * End Global Variables
 * 
*/

// build the nav

// Scroll to section on link click

function buildNavigationBar() {
    const fragment = document.createDocumentFragment();
    //use for each statement to loop on each navigation section
    navigationSections.forEach((navigationSec) => {
        const tagA = document.createElement('a');
        const tagLi = document.createElement('li'); // create list element for the unordered list
        tagA.innerText = navigationSec.getAttribute('data-nav'); //get datanav attribute for each section
        tagA.setAttribute('class', 'menu__link');
        // Scroll to anchor ID using scrollTO event
        // scroll to the section's ID using event scroll to
        tagA.addEventListener("click", (e) => {
            navigationSec.scrollIntoView({behavior: "smooth"}); //scrrollIntoView is a built in function in JS to scroll down to sections
            }); // set behavior as smooth scrolling
        tagLi.appendChild(tagA);
        fragment.appendChild(tagLi);
    });
    navigationMenu.appendChild(fragment);
};

function sectionIndexShown() {
    let min = window.innerHeight;
    shownSectionIndex = -1;
    navigationSections.forEach((navigationSec, index) => {
        let offset = navigationSec.getBoundingClientRect();
        if(Math.abs(offset.top) < min){
            min = Math.abs(offset.top);
            shownSectionIndex = index;
        }
    });
    return shownSectionIndex;
}


//now set the active class for the section when its near the viewport
function addActiveSec(){
    shownSectionIndex = sectionIndexShown();

    // If the section index exists
    if(shownSectionIndex != -1){
        // if it exists then create a list of A tags from the nav menu
        let aNavTagList = document.querySelectorAll('.menu__link');

        // use for loop to start looping through the sections
        for (let i = 0; i < navigationSections.length; i++) {
            // For each section in the view port, add an active state to both navigation and section
            if (i == shownSectionIndex){
                navigationSections[i].classList.add('your-active-class');
                aNavTagList[i].classList.add('your-active-class');
            }
            // For other sections, remove the active state from both navigation and section
            else{
                navigationSections[i].classList.remove('your-active-class');
                aNavTagList[i].classList.remove('your-active-class');
            }
        }; 
    };
}

//Call the function to start building navigation menu
buildNavigationBar();

// Now we Set sections as active 
document.addEventListener('scroll', addActiveSec);