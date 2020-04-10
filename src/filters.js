import Vue from 'vue';

//To AUD
Vue.filter("toDollar", function(text) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2
  });
  return formatter.format(text);
});