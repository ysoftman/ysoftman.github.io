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
cp ~/.bashrc ./
cp ~/.zshrc ./

# backup vimrc
cp ~/.vimrc ./