document.addEventListener('DOMContentLoaded', () => {
    const contentElements = document.querySelectorAll('.content');
    const nextButton = document.getElementById('next');
    const backButton = document.getElementById('back');
    const meetElement = document.getElementById('meet');

    const pageSeries = [
        'page-one.html',
        'page-two.html',
        'page-three.html',
        'page-four.html',
        'page-five.html',
        'page-six.html',
        'page-last.html'
    ];

    const currentPage = window.location.pathname.split('/').pop();
    const currentIndex = pageSeries.indexOf(currentPage);
    let selectedContent = null;

    if (currentIndex === -1) {
        console.error('Current page is not in the page series array');
        return;
    }

    contentElements.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
            element.style.border = '2px solid #97a4ae';
            element.style.backgroundColor = 'white';
        });

        element.addEventListener('mouseout', () => {
            if (element !== selectedContent) {
                element.style.border = '2px thin #97a4ae';
                element.style.backgroundColor = '#f8fdfe';
            }
        });

        element.addEventListener('mouseleave', () => {
            if (element !== selectedContent) {
                element.style.border = '';
                element.style.backgroundColor = '#f8fdfe';
            }
        });

        element.addEventListener('click', () => {
            if (selectedContent) {
                selectedContent.style.backgroundColor = 'white';
            }
            selectedContent = element;
            element.style.backgroundColor = 'white';

            const boldedElement = element.querySelector('.bolded');
            const value = boldedElement ? boldedElement.textContent : '';
            meetElement.textContent = value;
        });
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (selectedContent) {
            const boldedElement = selectedContent.querySelector('.bolded');
            const value = boldedElement ? boldedElement.textContent : '';
            meetElement.textContent = value;
            
            // Simulating navigation to next page
            localStorage.setItem('selectedValue', value);
            if (currentIndex < pageSeries.length - 1) {
                window.location.href = pageSeries[currentIndex + 1];
            }
        } else {
            alert('Please select a content first.');
        }
    });

    backButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (currentIndex > 0) {
            window.location.href = pageSeries[currentIndex - 1];
        }
    });

    // Check if there's a stored value (simulating next page load)
    const storedValue = localStorage.getItem('selectedValue');
    if (storedValue) {
        meetElement.textContent = storedValue;
    }
});
