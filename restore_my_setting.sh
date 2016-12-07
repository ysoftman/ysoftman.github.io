#!/bin/sh
# restore my settings

# install zsh and prezto
brew install zsh
#chsh -s /usr/local/bin/zsh
zsh ./installprezto.sh

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
