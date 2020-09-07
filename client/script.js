(function() {
  const autocompleteUrlPrefix = '/api/autocomplete/';
  document.getElementById('autocomplete-input').addEventListener('keyup',(ele) => {
    //get input value
    let inputValue = ele.target.value;
    //call map api to search  

    // method 1
    // let result = remoteCall(inputValue).then(value => {
    //   //render dropdown
    //   renderDropdown(value.suggestions);
    // });

    // method 2 try to use throttling
    throttle(remoteCall, 1000)(inputValue);
    // method 3 try to use debouncing
    debounce(remoteCall, 1000)(inputValue);
  })

  function renderDropdown(suggestions) {
    document.getElementById("dropdown-content").innerHTML = '';
    suggestions.forEach(element => {
      document.getElementById("dropdown-content")
        .insertAdjacentHTML('beforeend',
        `<a href="#" class="dropdown-item">
        ${element.label}
        </a>`
      )
    });
  }

  // method 1
  // async function remoteCall(input) {
  //   const response = await fetch(autocompleteUrlPrefix + input);
  //   return await response.json();
  // }

  // method 2 try to use throttling
  async function remoteCall(input) {
    const response = await fetch(autocompleteUrlPrefix + input);
    const result =  await response.json();
    renderDropdown(result.suggestions);
  }

  var inThrottle = false;
  const throttle = (func, limit) => {
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  var inDebounce = false;
  const debounce = (func, delay) => {
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }
})();