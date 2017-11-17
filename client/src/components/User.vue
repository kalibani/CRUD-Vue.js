<template>
  <div>
    <div class="container" id="events">
      <div class="row">
        <div class="col-sm-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 v-if="show">Add User Here</h3>
              <h3 v-else>Edit User Here</h3>
            </div>
            <div class="panel-body">
              <div>
                <form id="login-form" role="form" style="display: block;">
                <input class="form-control" type="text" placeholder="username" v-model="User.username">
                <input class="form-control" type="hidden" placeholder="username" v-model="User._id">
                <input class="form-control" type="password" placeholder="Password" v-model="User.password">
                <input class="form-control" type="text" placeholder="Fullname" v-model="User.fullname">
                <input class="form-control" type="text" placeholder="City" v-model="User.city">
                <input class="form-control" type="text" placeholder="Status" v-model="User.status">
                <button class="btn btn-primary" v-if="show" @click="addUser">Submit</button>
                <button class="btn btn-primary btn-warning" v-else @click="editUser(User._id), show = true">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <input class="form-control" placeholder="Search..." v-model="search">
          <div class="list-group">
            <li href="#" class="list-group-item" v-for="(User, index) in filteredUsers">
              <h3><i class="glyphicon glyphicon-user"></i> </h3>
              <h4 class="list-group-item-heading"> Username : {{ User.username }}</h4>
              <h4 class="list-group-item-text" v-if="User.password"> Password : {{ User.password }}</h4>
              <h4 class="list-group-item-text" v-if="User.fullname"> Fullname : {{ User.fullname }}</h4>
              <h4 class="list-group-item-text" v-if="User.city"> City : {{ User.city }}</h4>
              <h4 class="list-group-item-text" v-if="User.status"> Status : {{ User.status }}</h4>
              <br>
              <button class="btn btn-xs btn-danger" @click= "removeUser(index, User._id)">Delete</button>
              <button class="btn btn-xs btn-warning" @click="getUserbyId(User._id), show=false">Update</button>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'User',
  data(){
    return {
      User:{ username: '', password:'', fullname:'', city:'', status:'' },
      Users:[],
      show: true,
      search:''
    }

  },

  beforeMount: function() {
    this.getUser()
  },
  computed: {
    filteredUsers() {
      var self = this
      return this.Users.filter(function(user){
        return user.username.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      });
    }
  },

  methods:{
    addUser() {
      this.$http.post('/users', this.User).then((response) => {
        this.Users.push(this.User);
        location.reload()
        console.log('Succesfully add todo');
      }).catch((err) => {
        console.log(err);
      })
    },

    editUser(_id){
      this.$http.put('/users/' +_id, this.User).then((response) => {
        location.reload()
      })
      .catch((err) => {
        console.log(err);
      });

    },

    getUser() {
      this.$http.get('/users').then((response) => {
        this.Users = response.data
      }).catch((err) => {
        console.log(err);
      })
    },

    removeUser(index, _id){
      this.$http.delete('/users/'+_id).then((response) => {
        this.Users.splice(index, 1)
      }).catch((err) => {
        console.log(err);
      })
    },

    getUserbyId(_id){
      var self = this
      this.$http.get('/users/' +_id).then((response) => {
        Vue.set(self.$data, 'User', response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }


}
</script>

<style lang="css">
  .form-control { margin-bottom: 10px; }
  .navbar       { border-radius:0; }
</style>
