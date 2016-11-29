#!/bin/sh
# ysoftman
# vim-go 환결 설정 스크립트
# sh installvimgo.sh
# export 를 현재 쉘에 반영하고 싶다면 source installvimgo.sh

# go, ruby, mercurial, python, cmake, ctags 설치 및 환경변수 설정
if [ $(uname) == 'Darwin' ]; then
	echo 'OSX Environment'
	brew install go
	export GOROOT=/usr/local/bin/goㅑ
	brew install ruby mercurial python cmake ctags
elif [ $(uname) == 'Linux' ]; then
	echo 'Linux Environment'
	# yum 실행보기 
	yum --version
	# yum 실행후 exit code 0(SUCCESS) 이라면 사용할수 있다.
	package_program="yum"
	if [ $? == 0 ]; then
		package_program="yum"
	else
		package_program="apt-get"
	fi
	sudo package_program install go
	export GOROOT=/usr/bin/go
	sudo ${package_program} install ruby mercurial python-dev cmake ctags
else
	echo 'Only OS-X or Linux... exit'
	# 소스 빌드 및 설치
	#wget https://storage.googleapis.com/golang/go1.4.linux-amd64.tar.gz
	#tar -zxvf go1.4.linux-amd64.tar.gz
	#echo 'build and install golang'
	#export GOROOT=$PATH:$HOME/gGo
	exit
fi

GOPATH=${HOME}/workspace/gopath
echo GOPATH=${GOPATH}

# GOPATH 디렉토리가 없다면 생성
mkdir -p ${GOPATH}

export GOPATH=${GOPATH}
export PATH=$PATH:$GOROOT:$GOPATH

# 다음 디렉토리가 없다면 생성
mkdir -p ~/.vim/autoload
mkdir -p ~/.vim/bundle

# vimrc 백업하기
TEMP_FILE="ysoftman_vimrc_backup.temp"
# ysoftman_settings start ~ end 부분은 제외 하고 백업
cat ~/.vimrc | sed "/^\" ysoftman_settings_start/,/^\" ysoftman_settings_end/d;" > ${TEMP_FILE}
# vimrc 다시 작성
cat ${TEMP_FILE} > ~/.vimrc
# TEMP_FILE 삭제
rm -f ${TEMP_FILE}

echo '" ysoftman_settings_start' >>  ~/.vimrc

# vim 패키지(플러그인) 관지자 - pathogen
# vim-pathogen 을 ~/.vim/autoload 에 다운 받는다
cd ~/.vim/autoload
git clone https://github.com/tpope/vim-pathogen.git
# autoload 에 복사
cp -v ./vim-pathogen/autoload/pathogen.vim ./
# .vimrc 설정
#vi ~/.vimrc
echo '
execute pathogen#infect()
filetype plugin indent on' >> ~/.vimrc

# vim 패키지(플러그인) 관지자 - vundle
# ruby 가 설치되어 있어야함
# vundle 을 ~/.vim/bundle 에 다운 받는다
cd ~/.vim/bundle
git clone https://github.com/gmarik/Vundle.vim.git
# .vimrc 설정
#vi ~/.vimrc
echo '
" Vundle 사용하기 위한 설정
" https://github.com/gmarik/Vundle.vim 에서 발췌
set nocompatible              " be iMproved, required
filetype off                  " required
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
call vundle#end()            " required
filetype plugin indent on    " required
' >> ~/.vimrc
echo "Plugin 'gmarik/Vundle.vim'" >> ~/.vimrc
# vim-go 을 ~/.vim/bundle 에 다운 받는다
cd ~/.vim/bundle
git clone https://github.com/fatih/vim-go.git
# .vimrc 설정
#vi ~/.vimrc
echo "Plugin 'fatih/vim-go'" >> ~/.vimrc

# vim 실행 후 플러그인 설치
vim +PluginInstall +qall
# vim 실행 후 go 바이너리설치, $GOPATH/bin 에 필요한 파일들이 설치된다.
vim +GoInstallBinaries +qall

# 자동완성 기능
# python-dev, cmake 설치되어있어야함
# YCM 을 ~/.vim/bundle 에 다운 받는다
cd ~/.vim/bundle
git clone https://github.com/Valloric/YouCompleteMe.git
# 설치
cd YouCompleteMe
# 다음 명령이 필요하다면 수행
git submodule update --init --recursive
sh ./install.sh

# Tagbar (태그 창) 설치
# ctags 설치되어 있어야함
# Tagbar 을 ~/.vim/bundle 에 다운 받는다
cd ~/.vim/bundle
git clone https://github.com/majutsushi/tagbar.git
# vim 에서 :TagbarToggle 을 사용하면 오른쪽에 태그 창이 보인다.
# Ctrl+F12 단축키 설정
#vi ~/.vimrc
echo 'nmap <c-f12> :TagbarToggle<cr>' >> ~/.vimrc

# NertdTree (파일 브라우저) 설치
cd ~/.vim/bundle
git clone https://github.com/scrooloose/nerdtree.git
# vim 에서 :NERDTreeToggle 을 사용하면 오른쪽에 태그 창이 보인다.
# F11 단축키 설정
#vi ~/.vimrc
echo 'nmap <c-f11> :NERDTreeToggle<cr>' >> ~/.vimrc

# vim-go 명령들
#:GoRun (go 실행)
#:GoBuild (go 빌드)
#:GoDoc (go 문서)
#:GoDef (go 변수 정의)
#:GoFmt(go 형식 맞춤)
#:GoImports (go 패키지 자동 임포트)
# 단축키 설정하자
echo 'nmap <f5> :GoRun<cr>
nmap <f7> :GoBuild<cr>
nmap <c-i> :GoFmt<cr>
nmap <c-p> :GoImports<cr>' >> ~/.vimrc

echo '" ysoftman_settings_end' >>  ~/.vimrc

