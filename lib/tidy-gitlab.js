'use babel';

import TidyGitlabView from './tidy-gitlab-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  tidyGitlabView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.tidyGitlabView = new TidyGitlabView(state.tidyGitlabViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.tidyGitlabView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.addOpener(uri => {
      if (uri === 'atom://tidy-gitlab') {
        return new TidyGitlabView();
      }
    }));
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidy-gitlab:toggle': () => this.toggle()
    }));

    // why not do this in the deactivate method?
    this.subscriptions.add(new Disposable(() => {
      atom.workspace.getPaneItems().foreach(item => {
        if (item instanceof TidyGitlabView) {
          item.destroy();
        }
      })
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    // this.tidyGitlabView.destroy();
  },

  // serialize() {
  //   return {
  //     tidyGitlabViewState: this.tidyGitlabView.serialize()
  //   };
  // },

  toggle() {
    console.log('TidyGitlab was toggled!');
    atom.workspace.toggle('atom://tidy-gitlab');
  }

};
