%*                   Document class for Exams.
% Specially commented for Outline under Emacs
% (latex-mode) (setq outline-regexp "^%[*]+") (outline-minor-mode t)


%* Class Definition  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%** LaTeX version needed:
\NeedsTeXFormat{LaTeX2e}
%** Class provided:
\ProvidesClass{problem}[]
%** Paper, size of the font, base class
\LoadClass{assignment}
\RequirePackage[utf8]{inputenc}

%** Packages from American Mathematical Society (AMS), in particular fro fancyhdr
\RequirePackage{amsmath}
\RequirePackage{amssymb}
%\RequirePackage{amsthm}

\renewcommand{\maketitle}{}


%*** display of Problems
\def\problemTitle{Problem}

%*** display of solutions
\definecolor{colorSolution}{named}{red}
\renewenvironment{displaySolution}%
{\color{colorSolution}\begin{center}
                          --begin~solution--
\end{center}}%
{\begin{center}
     ---------------------end~solution-------------------------
\end{center}\normalcolor}%

\renewenvironment{displayMarkingScheme}%
{\color{colorOptional} \par\noindent\slshape\textbf{Marking Scheme: }}%
{\normalcolor\par\smallskip}
\renewenvironment{displaySuggestedMarkingScheme}%
{\color{colorOptional} \par\noindent\slshape\textbf{Suggested Marking Scheme: }}%
{\normalcolor\par\smallskip}

\if@pageBreak
\renewenvironment{displayProblem}{\pagebreak}{}
\else
\renewenvironment{displayProblem}{}{}
\fi

