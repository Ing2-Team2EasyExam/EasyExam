%*                   Document class for Assignements.
% Inspired by a class file by Claude Marche, from LRI, Orsay France,
% who himself was inspired by a file from Ralf Treinen.
%
% Developped for the course CS421 at UBC by Jeremy Barbay
% Adapted for the course CS240 at UW by Jeremy Barbay 
%
% Specially commented for Outline under Emacs
% (latex-mode) (setq outline-regexp "^%[*]+") (outline-minor-mode t) 


%* Class Definition  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%** LaTeX version needed:
\NeedsTeXFormat{LaTeX2e}
%** Class provided:
\ProvidesClass{assignment}[2004/11/23 by Jeremy Barbay]
%** Paper, size of the font, base class
\LoadClass[11pt]{article}

%* Package dependancies:  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%** For page settings:
\RequirePackage{fullpage}
% ** Footer
\RequirePackage{lastpage}
\RequirePackage{fancyheadings}
%** For Problems look and feel:
\RequirePackage{problem}
%** Fonts:
%\RequirePackage{times}
% For algorithms.
\RequirePackage{algorithmic}
\RequirePackage{algorithm}
%** For number of pages to be given by \pageref{LastPage},
% for instance as in \rfoot{{\thepage} of \pageref{LastPage}}
\RequirePackage{lastpage}

%* OPTIONS of the package:  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%** Binary options:
%
%*** displayPbList:
\DeclareOption{displayPbList}{\@displayPbListtrue}
\newif\if@displayPbList
\@displayPbListfalse

%* Processing of the options:
\ProcessOptions


%* Settings and Macros:  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%** Command \maketitle{}{}
% To present the same header for all assignments, define 
% your typical header here.
% This way if you reuse your assignments in later years, 
% you only need to change the year here.
\newcommand{\institution}{\hfill}
\newcommand{\courseCode}{ }
\newcommand{\courseName}{ }
\newcommand{\courseInstructors}{ }
\newcommand{\assignmentName}{ }
\newcommand{\assignmentDate}{ }

\renewcommand{\maketitle}{
\begin{center}
    \institution\\[\baselineskip]
    {\bf \courseCode \hfill \courseName \hfill \courseTerm}\\[\baselineskip]
    {\large\bf \assignmentName}
    \if@solution \color{colorSolution}Solution \normalcolor \fi
    \color{colorOptional}
    \if@displayPbList Table of Content \fi
    % \if@textOnly TextOnly \fi
    \if@markingScheme MarkingScheme \fi
    \if@authorship AuthorShip \fi
    \if@usage Usage \fi
    %\if@hint Hint \fi
    \normalcolor
    \\(Due: \assignmentDate)\\[2\baselineskip]
\end{center}

\if@solution
\begin{center}
    \bigskip
    \begin{minipage}{.75\textwidth}
    {\em Notice}
        : This solution is provided for your personal use.
        Distributing it or adding it to an indexed database is forbidden.
    \end{minipage}
    \bigskip
\end{center}
\fi

\if@displayPbList
\hrule
\color{colorOptional}
\tableofcontents
\normalcolor
\medskip
\hrule
\bigskip
\fi
}


%
%** Options of formating:
\AtBeginDocument{%
%*** Redefinition of the numbering of the enumerate environment:
% As problems are numeroted in arabic numbers,
% it make sence to numerote the question in alphanumeric,
% such that a question in an assignment can be refered as
% 1.a and so on...
\renewcommand{\labelenumi}{\alph{enumi}.}
%
%*** Itemize bullets:
% Just a matter of preferences,
% for CS421 I prefer bullets in itemize environment.
% The important part is that it should be defined HERE
% and NOT in the assignment or in the problems files,
% such that it stays standard all along an assignment or
% an exercise book.
\renewcommand{\labelitemi}{$\bullet$}
%
%*** \sloppy and \hbadness
% Same argument than for the itemize environment:
% it is not necessary to redefine this,
% but if redefined it must be done here.
% The \sloppy option makes linebreaks easier to manage if
%somehow less ``beautiful''
\sloppy \hbadness=5000


\definecolor{colorSolution}{named}{red}
\renewenvironment{displaySolution}%
{\color{colorSolution}\begin{center}
                          --------------------begin solution------------------------
\end{center}}%
{\begin{center}
     ---------------------end solution--------------------------
\end{center}\normalcolor}%
%*** display of hints
\renewenvironment{displayHint}%
{\noindent{\em Hint:}}%
{}
%*** display of Miscellany
\renewenvironment{displayMiscellany}%
{\medskip \noindent{\em Miscellany:}}%
{}
%*** display of codeExample
\renewenvironment{displayCodeExample}%
{\noindent{\em Example:}}%
{}
%
%*** display of textOnly
\renewenvironment{displayTextOnly}%
{}%
{}}
%


