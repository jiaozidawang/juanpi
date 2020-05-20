export function chooseValue () {
  let args = [...arguments];

  console.log(args);

  for(var i = 0; i <= 3; i++) {
    if(args[i]){
      console.log(args[i]);
      return args[i];
    };
  };
}
