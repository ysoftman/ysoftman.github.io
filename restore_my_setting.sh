#!/bin/sh
# restore my settings

# restore brew, pip programs
sh ./installbybrew.sh
sh ./installbypip.sh

# restore shell settings
cp -fv ./.bash ~/.bashrc
cp -fv ./.zshrc ~/.zshrc

# backup vimrc
cp -fv ./.vimrc ~/.vimrc

# restore .ssh directory
cp -rfv ./.ssh ~/.ssh

# restore vscode settings
cp -fv ./.vscode/*.json ~/Library/Application\ Support/Code/User/ 

# restore vscode extension
sh ./install_vscode_extension.sh

# install zsh
brew install zsh
chsh -s /usr/local/bin/zsh
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
    ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
#echo 'source ~/.zprezto/init.zsh' >> ~/.zshrc
source ~/.zprezto/init.zsh
