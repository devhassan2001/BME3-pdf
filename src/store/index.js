import { createStore } from 'vuex'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import db from '../main';

export default createStore({
  state: {
    // * show sideMenu component 
    showSideMenu: false,

    // * for admins users
    admin: false,

    // * all Account data
    showAddAccount: false,
    showLogin: false,
    showAccount: false,

    // * sortBy box data (in header component)
    sortBy: 'Sort by',

    // * (actions) getFile data 
    files: [],
    save: [],
    slider: null,
    move: 0,
    fileWidth: null,
    multifilter: false, 
    moveForward: null,
    moveBackward: null,
  },
  mutations: {
    // * open or close sideMenu component
    toggleShowSideMenu (state) {
      state.showSideMenu = !state.showSideMenu;
    },

    // * open or close AddAccount component
    toggleShowAddAccount (state) {
      state.showAddAccount = !state.showAddAccount;
    },

    // * open or close AddAccount component
    toggleShowLogin (state) {
      state.showLogin = !state.showLogin;
    },

    // * open or close Account component
    toggleShowAccount (state) {
      state.showAccount = !state.showAccount;
    },

    // * if the user admin do this function
    toggleAdmin (state) {
      state.admin = true;
    },

    // * change the text of the sort by box
    sortBy (state, text) {
      state.sortBy = text;
    },

    // * get the slider element
    getSlider (state, slider) {
      state.slider = slider;
    },

    // * move the slider to the user want direction
    moveSlider (state, direction) {
      if(direction === 'moveForward') {
        state.slider.style.transform = `translateX(-${state.move += state.fileWidth}px)`;
      } else if (direction === 'moveBackward') {
        state.slider.style.transform = `translateX(-${state.move -= state.fileWidth}px)`
      } else {
        state.slider.style.transform = `translateX(0px)`
      }
    },

    // * decrease move forward and increase move backward (for cta arrows)
    decFward_incBward (state) { 
      state.moveBackward++;
      state.moveForward--;
    },

    // * decrease move backward and increase move forward (for cta arrows)
    decBward_incFward (state) { 
      state.moveBackward--;
      state.moveForward++;
    },
    // * reset the slider data to it start poistion (0)
    resetSlider (state) {
      state.move = 0;
      state.moveForward = state.files.length - 1;
      state.moveBackward = 0;
    },

    // * set the width of the file
    setFileWidth (state, width) { 
      state.fileWidth = width + 35;
    },

    // * for menu component filter
    classFilter (state, className) {
      if(state.sortBy === 'Sort by') {
        state.multifilter = true;
      }
      state.files = state.save.filter(file => {
        return  file.class_name === className;
      })
    },

    // * for search bar filter
    searchFilter (state, v) {
      if(state.sortBy === 'Sort by') {
        state.multifilter = true;
      }
      // ! file.lecture must be a nubmer in firebase
      state.files = state.files.filter(file => {
          if(file.class_name.toLowerCase().includes(v) || file.lecture.toLowerCase().includes(v) 
          || file.week == (v) || file.doctor.toLowerCase().includes(v)) return true; 
      });
      if(v === '')
      {
        state.files = state.save;
      }
    }
  },
  actions: {
    async getFiles ({ commit, state }) {
      if(state.multifilter && state.sortBy === 'week') {
        state.files.sort((a,b) => {
          if(a.week > b.week) return 1;
          if(a.week < b.week) return -1;
          return 0;
        });
        state.multifilter = false;
        commit('moveSlider', ''); 
        commit('resetSlider');
      } else {
        state.files = [];
        state.save = [];
        let docs;
        if(state.sortBy === 'Sort by') {
          docs = await getDocs(collection(db, "files"));
        } else {
          docs = await getDocs(query(collection(db, "files"), orderBy(state.sortBy)));
        }

        docs.forEach((doc) => {
          let obj = {};
          obj['id'] = doc.id;
          obj['class_name'] = doc.data().class_name;
          obj['doctor'] = doc.data().doctor;
          obj['file_ref'] = doc.data().file_ref;
          obj['lecture'] = doc.data().lecture;
          obj['video_link'] = doc.data().video_link;
          obj['img'] = doc.data().file_image;
          obj['date'] = doc.data().date;
          obj['week'] = doc.data().week;
  
          state.files.push(obj);

        });
        state.save = state.files;
        state.multifilter = false;
        commit('moveSlider', ''); 
        commit('resetSlider');
      }
    },


    async deleteFile ({ dispatch }, id) {
      await deleteDoc(doc(db, 'files', id));
    },
  },


})
