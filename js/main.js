let lastScroll = 0;
const header = document.querySelector("header");
const arrow_up = document.getElementById("arrow_up");

if (window.pageYOffset === 0) {
    header.classList.add("header-hidden");
    
}

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
            
        if (currentScroll <= 0) {
            header.classList.add("header-hidden");
            
        } else if (currentScroll > lastScroll) {
            header.classList.remove("header-hidden"); 
        } else {
            header.classList.add("header-hidden"); 
            
        }

    lastScroll = currentScroll;
});

const arrowUp = document.getElementById("arrow_up");

if (arrowUp) {
    window.addEventListener("load", () => {
        if (window.pageYOffset === 0) {
            arrowUp.classList.remove("show-arrow");
        }
    });

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            arrowUp.classList.add("show-arrow");
        } else {
            arrowUp.classList.remove("show-arrow");
        }
    });

    arrowUp.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function calculateEnergy() {
    const power = document.getElementById('power').value;
    const time = document.getElementById('time').value;
    const efficiency = document.getElementById('efficiency').value;

    if (power && time && efficiency) {
       
        const energy = (power * time * (efficiency / 100)).toFixed(2);
        document.getElementById('energy-output').innerText = energy;
    } else {
        document.getElementById('energy-output').innerText = "Proszę wprowadzić wszystkie wartości.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const wasteItemsContainer = document.querySelector(".waste-items");
    const wasteItems = document.querySelectorAll(".waste");
    const bins = document.querySelectorAll(".bin");
    const result = document.getElementById("result");

    const correctBins = {
        "newspaper": "paper-bin",
        "bottle": "plastic-bin",
        "jar": "glass-bin",
        "jar2": "glass-bin", 
        "Konserwy": "metal-bin",
        "Jablko1": "bio-bin",
        "Jablko2": "bio-bin"
    };

    let removedItemsCount = 0;
    const itemsToShow = 3; 
    const itemWidth = 96 + 15; 

    wasteItems.forEach(item => {
        item.addEventListener("dragstart", dragStart);
    });

    bins.forEach(bin => {
        bin.addEventListener("dragover", dragOver);
        bin.addEventListener("drop", dropWaste);
    });

    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dropWaste(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const wasteItem = document.getElementById(id);

        const targetBin = e.target.closest(".bin");
        const targetBinId = targetBin ? targetBin.id : null;

        if (targetBinId && targetBinId === correctBins[id]) {
            wasteItem.remove();  
            removedItemsCount++;
            result.textContent = "Dobrze! Poprawnie posegregowany odpad.";
            result.style.color = "green";

            if (removedItemsCount % itemsToShow === 0) {
                
                wasteItemsContainer.style.transform = `translateX(${translateX}px)`;
            }

            if (document.querySelectorAll(".waste-items .waste").length === 0) {
                result.textContent = "Dobrze! Wszystkie odpady zostały poprawnie posegregowane.";
            }
        } else {
            result.textContent = "Niepoprawny kosz. Spróbuj ponownie.";
            result.style.color = "red";
        }
    }
});

function initIntersectionObserver() {
    const options = {
        threshold: 0.1 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.text-in-block,.text-in-punktor,.text-in-block2').forEach((element) => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initIntersectionObserver);


const blocks = document.querySelectorAll('.block1,.block2,.block3,.block4,.block5'); 
 
blocks.forEach(block => { 
    block.addEventListener('mousemove', (e) => { 
        const rect = block.getBoundingClientRect(); 
        const blockCenterX = rect.left + rect.width / 2; 
        const blockCenterY = rect.top + rect.height / 2; 
 
        const offsetX = (e.clientX - blockCenterX) / 45; 
        const offsetY = (e.clientY - blockCenterY) / 45; 
 
        block.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`; 
        block.style.boxShadow = `${-offsetX * 2}px ${-offsetY * 2}px 5px rgba(0, 173, 115, 0.5)`; 
    }); 
 
    block.addEventListener('mouseleave', () => { 
        block.style.transform = 'translate(0, 0)'; 
        block.style.boxShadow = '0px 7px 10px rgba(0, 173, 115, 0.6)'; 
    }); 
}); 

const emissionData = {
    regions: [
      "Mazowieckie", "Pomorskie", "Wielkopolskie", "Dolnośląskie", "Śląskie", "Małopolskie",
      "Podkarpackie", "Łódzkie", "Lubelskie", "Lubuskie"
    ],
    emissions: [320, 210, 180, 250, 300, 220, 170, 190, 140, 120]
  };
  
  const ctx = document.getElementById('emissionChart').getContext('2d');
  const emissionChart = new Chart(ctx, {
    type: 'bar', 
    data: {
      labels: emissionData.regions, 
      datasets: [{
        label: 'Emisja (tys. ton)',
        data: emissionData.emissions, 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tysiące ton'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Regiony (to nie są aktualne dane zrobione dla przykladu)'
          }
        }
      }
    }
  });


document.addEventListener('DOMContentLoaded', function () {
    var arrow = document.querySelector('.arrow');
    var nextBlock = document.querySelector('.block5');

    arrow.addEventListener('click', function () {
        nextBlock.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var arrow = document.querySelector('.arrow_up_b1');
    var nextBlock = document.querySelector('.block1');

    arrow.addEventListener('click', function () {
        nextBlock.scrollIntoView({ behavior: 'smooth' });
    });
});




