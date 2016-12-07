syntax on
color elflord
set number
set hlsearch
set backspace=indent,eol,start
set fencs=utf-8,cp949
set tabstop=4
set autoindent


" ysoftman_settings_start

execute pathogen#infect()
filetype plugin indent on

" Vundle 사용하기 위한 설정
" https://github.com/gmarik/Vundle.vim 에서 발췌
set nocompatible              " be iMproved, required
filetype off                  " required
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
call vundle#end()            " required
filetype plugin indent on    " required

Plugin 'gmarik/Vundle.vim'
Plugin 'fatih/vim-go'
nmap <f12> :TagbarToggle<cr>
nmap <f10> :NERDTreeToggle<cr>
nmap <f5> :GoRun<cr>
nmap <f7> :GoBuild<cr>
nmap <c-i> :GoFmt<cr>
nmap <c-p> :GoImports<cr>
" ysoftman_settings_end
