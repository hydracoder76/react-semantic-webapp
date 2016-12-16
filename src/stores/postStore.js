import { action, extendObservable, observable } from 'mobx';
import _ from 'lodash';

class PostStore {
  constructor() {
    let selectedAccounts = localStorage.getItem('selectedAccounts');
    selectedAccounts = selectedAccounts ? JSON.parse(selectedAccounts) : [];

    extendObservable(this, {
      selectedAccounts: observable(selectedAccounts),
      handleSelectedAccountChange: action((id) => {
        if(this.selectedAccounts.slice().indexOf(id) > -1) {
          this.selectedAccounts.remove(id);
        }
        else {
          this.selectedAccounts.push(id);
        }
        localStorage.setItem('selectedAccounts', JSON.stringify(this.selectedAccounts));
      }),
      clearSelectedAccounts: action(() => {
        this.selectedAccounts = [];
      })
    });
  }
}

const postStore = new PostStore();

export default postStore;
export { PostStore }
