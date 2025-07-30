const pets = [
  { name: "Buddy", type: "Dog", age: 3, img: "dog01.jpg" },
  { name: "Charlie", type: "Dog", age: 4, img: "dog03.jpg" },
  { name: "Whiskers", type: "Cat", age: 2, img: "cat01.jpg" },
  { name: "Mittens", type: "Cat", age: 2, img: "cat02.jpg" },
  { name: "Shadow", type: "Cat", age: 5, img: "cat03.jpg" },
  { name: "Coco", type: "Capybara", age: 1, img: "capybara01.jpg" },
  { name: "Nibbles", type: "Capybara", age: 2, img: "capybara02.jpg" },
  { name: "Bubbles", type: "Bird", age: 3, img: "bird01.jpg" },
  { name: "Tweety", type: "Bird", age: 1, img: "bird02.jpg" },
];

function loadPets() {
  console.log("Loading pets...");
  const petList = $("#pet-list");
  petList.empty(); // Ensure it's clear before initial load
  pets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name} the ${pet.type}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });

  // Attach click handler using event delegation
  petList.on("click", ".adopt-btn", adoptPet);

  // Install checkbox change handler
  $('input[name="pet-type"]').on("change", filterPets);
}

function filterPets() {
  const types = $('input[name="pet-type"]:checked')
    .map(function () {
      return $(this).val();
    })
    .get();

  const filteredPets = pets.filter((pet) => types.includes(pet.type));

  const petList = $("#pet-list");
  petList.empty();
  filteredPets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name} the ${pet.type}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });
}

function adoptPet() {
  const petName = $(this).siblings("h3").text();
  alert(`Thank you for adopting ${petName}! 🐾`);
}

$(document).ready(loadPets);
