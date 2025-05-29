

// Parallax photo in hero
document.addEventListener("DOMContentLoaded", function() {
  const layer = document.querySelector('.hero-img');
  document.addEventListener('mousemove', (event) => {
  layer.style.transform = 'translate3d(' + ((event.clientX * 0.3) / 4) + 'px,' + ((event.clientY * 0.4) / 6) + 'px, 0px)';
  })
});

// Accordeon in price section

const accordeon = document.querySelectorAll('.accord-sect');

for(item of accordeon) {
  item.addEventListener('click', function(){
      if(this.classList.contains('active')) {
          this.classList.remove('active');
      } else {
          for(el of accordeon) {
              el.classList.remove('active');
          }
          this.classList.add('active');
      }
  })
};

document.querySelector('.accord-sect').click();

//Form validate

let selector = document.querySelector("input[type='tel']");
let im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

new JustValidate('.contacts-form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    mail: {
      required: true,
      email: true
    },
    phone: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
    checkbox: {
      required: true,
      checked: true
    }
  }
});

// Validation of correctness of input into form fields

const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const telInput = document.getElementById('tel')

// Функция валидации имени
function validateName() {
	const value = nameInput.value.trim()
	if (value === '') {
		nameInput.style.borderColor = 'red'
		return false
	}
	nameInput.style.borderColor = '#44aacc'
	return true
}

// Функция валидации email
function validateEmail() {
	const value = emailInput.value.trim()
	const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
	if (!emailRegex.test(value)) {
		emailInput.style.borderColor = 'red'
		return false
	}
	emailInput.style.borderColor = '#44aacc'
	return true
}

// Функция валидации телефона
function validateTel() {
	const value = telInput.value.trim()
	const telRegex = /^\\+?[0-9]{10,15}$/
	if (!telRegex.test(value)) {
		telInput.style.borderColor = 'red'
		return false
	}
	telInput.style.borderColor = '#44aacc'
	return true
}

// Обработчики событий ввода
nameInput.addEventListener('input', validateName)
emailInput.addEventListener('input', validateEmail)
telInput.addEventListener('input', validateTel)

// Обработка отправки формы
document.querySelector('form').addEventListener('submit', function (e) {
	const isNameValid = validateName()
	const isEmailValid = validateEmail()
	const isTelValid = validateTel()

	if (!isNameValid || !isEmailValid || !isTelValid) {
		e.preventDefault() // Блокируем отправку при ошибках
	} else {
		e.preventDefault() // Для примера не отправляем форму на сервер
		alert('Спасибо за заказ! Я скоро свяжусь с вами')
		this.reset()
		nameInput.style.borderColor = '#44aacc'
		emailInput.style.borderColor = '#44aacc'
		telInput.style.borderColor = '#44aacc'
	}
})

// Mobile menu

const burger = document.querySelector('.burger-btn')
const link = document.querySelectorAll('.menu-link');
const mobMenu = document.querySelector('.menu-list');
const hero = document.querySelector('.hero');

burger.onclick = function() {
  mobMenu.classList.toggle('active');
  wrap.classList.toggle('lock');
}

link.forEach(function(item) {
  item.onclick = function() {
    mobMenu.classList.remove('active');
    wrap.classList.remove('lock');
  }
});

hero.onclick = function () {
	mobMenu.classList.remove('active')
	wrap.classList.remove('lock')
}

// JavaScript: отправка формы с данными в формате JSON
document.getElementById('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const tel = document.getElementById('tel').value.trim();

  const data = { name, email, tel };

  try {
    const response = await fetch('mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Форма успешно отправлена!');
      document.getElementById('form').reset();
    } else {
      alert('Ошибка при отправке формы.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке данных.');
  }
});
