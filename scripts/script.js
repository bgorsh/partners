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

let selector = document.querySelector("input[type='phone']");
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

//Validate form and correct filling of form fields 
let name = document.getElementById('name')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let emailError = document.getElementById('email-error')

let fields = [name, email, phone]

document.getElementById('submit').addEventListener('click', function () {
	let isValid = true

	// Очистка сообщений об ошибках
	emailError.style.display = 'none'

	// Проверка пустых полей
	fields.forEach(field => {
		if (!field.value.trim()) {
			field.style.borderColor = 'red'
			isValid = false
		} else {
			field.style.borderColor = 'white'
		}
	})

	// Проверка email
	const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
	if (email.value.trim() && !emailRegex.test(email.value.trim())) {
		email.style.borderColor = 'red'
		emailError.style.display = 'block'
		isValid = false
	}

	// Проверка номера телефона
	const digitsOnly = phone.value.replace(/\\D/g, '')
	if (phone.value.trim() && digitsOnly.length < 10) {
		phone.style.borderColor = 'red'
		isValid = false
	}

	if (isValid) {
		alert('Спасибо за заказ! Мы скоро свяжемся с вами')
		fields.forEach(field => (field.value = ''))
		emailError.style.display = 'none'
	}
})
