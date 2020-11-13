var key="afa38e9fd88f83e811a283779a635569"; // wait for sign up api key
var nameInputEl = document.querySelector("#start");//jquery lisener from input box;
var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchname = nameInputEl.value.trim();
    if (searchname) {
      getMoiveStatus(searchname);//function
      repoContainerEl.textContent = "";
      nameInputEl.value = "";
    } else {
    //   alert(‘Please enter a correct name’);
    console.log("Wrong input");
    }
  };

  var   getMoiveStatus= function (repos, searchTerm){
    

  }