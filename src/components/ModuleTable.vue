<template>
  <div class="container">
    <div class="module">
      <div class="module__inner">
        <div class="module__inner-title">
          <h4>Properties</h4>

          <h4>Order</h4>
        </div>
        <form @submit.prevent="submitForm"  class="module__inner-items module__table">
          <div class="module__table-item table__item" v-for="(prop,index) in optionList" :key="index">
            <div class="table__item-block">
              <p class="table__item-id">{{prop.priority + 1}}.</p>
              <v-select class="table__item-select"
                        v-model="selected[`${index}`]"
                        :value="selectedValue"
                        @input="setSelected(index,selected[`${index}`])"
                        :options="availableValues ? availableValues : options"
              />
            </div>

            <div class="table__item-btns">
              <button v-for="button in buttons" @click="trigger(button,index)" :key="button.index" :type="button.type">
                <i :class="'fas ' + button.class "></i>
              </button>
            </div>
          </div>

          <button @click="addProperties" type="button" class="module__inner-add"><i class="fas fa-plus-circle"></i>Add property</button>

          <button class="module-btn" type="submit">Sort</button>
        </form>

      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vSelect from 'vue-select'
// import axios from "axios";

export default {
name: "ModuleTable",
  data(){
  return{
    properties:[],
    selected: {},
    selectedValue:null,
    availableValues:null,
    sortArr:{},
    newSelected:null
  }
  },
  components:{
    vSelect
  },

  computed: {

    ...mapGetters(['allProperty','optionList']),

    options(){
      return this.allProperty.map( prop => prop.name)
    },
    propertiesName(){
      return this.optionList.map(property => property.name)
    },
    buttons() {

      let btns = {};

      btns['order'] = {
        title: 'Order',
        type: "button",
        class:'fa-sort-amount-down-alt'
      }
      btns['delete'] = {
        title: 'Delete',
        type: "button",
        class:'fa-trash-alt'
      }

      return btns;
    },
  },
  methods: {


    trigger(btn,index){
      if (btn.title === 'Order'){
        this.optionList[index].orderTypeDefault === 'ASC' ?
            this.optionList[index].orderTypeDefault = 'DESC' : this.optionList[index].orderTypeDefault = 'ASC'
      }else
      {
        delete this.selected[index]
        this.selected = this.renameKeys(this.selected)
        this.$store.commit('deleteProperty',index)
        this.setAvailableValues()
      }
    },
    renameKeys(obj){
      const keyValues = Object.keys(obj).map((key,index) => {
        return { [index] : obj[key] };
      });
      return Object.assign({}, ...keyValues);
    },
    addProperties(){
        this.$store.commit('addProperties', {
          name:'',
          title:'',
          orderTypeDefault: "ASC",
          priority: this.optionList.length,
        })
    },
    submitForm(){
      // Test request
    // axios.post('https://api.coindesk.com/v1/bpi/currentprice.json',{
    //   body:this.optionList
    // })
      console.log(this.optionList)
    },
    setAvailableValues(){
      function comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            return other === current}).length === 0;
        }
      }
      const onlyInA = this.propertiesName.filter(comparer(this.options));
      const onlyInB = this.options.filter(comparer(this.propertiesName));

      this.availableValues = onlyInA.concat(onlyInB).filter(item => item !== '');
    },

    setSelected(index,sel){
      this.$store.commit('updateOptionList',{
        name:sel,
        index:index
      })
      this.setAvailableValues()

    },

  }
}
</script>

<style lang="scss">

.module__inner{
  &-add{
    color: #14A14C;
    border: 1px solid #14A14C;
    background-color: transparent;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin: 50px auto 0;
    i{
      margin-right: 5px;
    }
  }
  &-title{
    width: 900px;
    margin: auto;
  }
}
.module-btn{
  display: block;
  margin: 50px auto;
  padding: 10px 40px;
  background-color: transparent;
  border: 2px solid #14A14C;
  color: #14A14C;
  font-weight: bold;
  border-radius: 25px;
}
.table__item{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &-block{
    display: flex;
    align-items: center;
  }
  &-select{
    width:800px;
    margin: 0 20px;
  }
}
.table__item-btns{
  button{
    background: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
  }
  button:first-child{
    margin-right: 10px;
  }

}
@media (max-width: 990px) {
  .table__item-select{
   max-width: 400px;
    margin: 0 auto;
  }
  .module__inner-title{
    max-width: 400px;
    margin: 0 auto;
  }
  .table__item-btns{
    display: flex;
    align-items: center;
  }
}
@media (max-width: 420px){
  .table__item-select{
    max-width: 200px;
  }
  .module__inner-title{
    max-width: 200px;
  }
}
@import "vue-select/src/scss/vue-select.scss";
</style>
