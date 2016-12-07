#!/bin/sh
# backup my settings

# backup my brew list and make install script
install_file="installbybrew.sh"
echo '#!/bin/sh' > ${install_file}
printf "brew install " >> ${install_file}
brew list | sort | tr '\n' ' ' >> ${install_file}

# backup my pip list and make install script
install_file="installbypip.sh"
echo '#!/bin/sh' > ${install_file}
printf "pip install " >> ${install_file}
pip list | awk '{print $1}' | tr '\n' ' ' >> ${install_file}

# backup my shell settings
cp -v ~/.bashrc ./
cp -v ~/.zshrc ./

# backup vimrc
cp -v ~/.vimrc ./

# backup .ssh directory
cp -rv ~/.ssh ./

# backup vscode settings
mkdir -p .vscode
cp -v ~/Library/Application\ Support/Code/User/*.json ./.vscode/

# backup vscode extension and make install script
install_file="install_vscode_extension.sh"
echo '#!/bin/sh' > ${install_file}
code --list-extensions  | sed 's/^/code --install-extension /g' >> ${install_file}
