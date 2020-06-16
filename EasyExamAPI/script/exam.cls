%*                   Document class for Exams.
% Specially commented for Outline under Emacs
% (latex-mode) (setq outline-regexp "^%[*]+") (outline-minor-mode t)


%* Class Definition  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%** LaTeX version needed:
\NeedsTeXFormat{LaTeX2e}
%** Class provided:
\ProvidesClass{exam}[2018/07/13 by Jeremy Barbay]
%** Paper, size of the font, base class
\LoadClass[11pt]{article}
\RequirePackage[utf8]{inputenc}

%** Packages from American Mathematical Society (AMS), in particular fro fancyhdr
\RequirePackage{amsmath}
\RequirePackage{amssymb}
%\RequirePackage{amsthm}


%* Settings and Macros:  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ** Footer
\AtBeginDocument{%
\pagestyle{fancy}
%\setlength{\headrulewidth}{0pt}
\renewcommand{\headrulewidth}{0pt}
\lhead{}
\chead{}
\rhead{}
\lfoot{\courseCode}
\cfoot{\if@solution\else Full Name:\hspace{5cm} \fi}
% \cfoot{\if@solution\else Iniciales:\hspace{5cm}\fi}
%\cfoot{\if@solution\else RUN:\hspace{5cm}\fi}
%\cfoot{\if@solution\else  \hspace{5cm}\fi}
\rfoot{{\thepage} out of \pageref{LastPage}}
}

%** Command \maketitle{}
% To present the same header for all exams, define
% your typical header here.
% This way if you reuse your assignments in later years,
% you only need to change the year here.
\providecommand{\problemTitle}{Part}
\providecommand{\examName}{ Examen }
\providecommand{\examDate}{ }
\providecommand{\examStartTime}{ }
\providecommand{\examEndTime}{ }
\providecommand{\examLength}{ }
\renewcommand{\maketitle}{
\noindent
\begin{center}
    \begin{minipage}{6cm}
        \begin{center}
            \bf
            \institution \\
            {\examName} {\courseCode} \\
            \color{colorOptional} \if@displayPbList Table of Content \fi
            \normalcolor
        \end{center}
        \if@solution\else %
        \noindent\begin{tabular}{|p{2cm}p{3cm}|}
                     \hline
                     Course: & \courseName \\
                     Code: &  \courseCode  \\
                     Professor: & {\courseInstructors}  \\\hline
        \end{tabular}
        \fi
    \end{minipage} %
    \if@solution\else %
    \hfill
    \begin{minipage}{.6\textwidth}
        \fbox{%
        \begin{minipage}[c]{1pt}
            \rule{0pt}{5cm}
        \end{minipage}%
        \begin{minipage}[c]{\linewidth}
            Student Name: \\[1.5cm]
            Student Number: \\[1.5cm]
        \end{minipage}}
    \end{minipage}
    \fi
\end{center}

\if@solution\else%
\noindent
\framebox[\linewidth][l]{
\begin{tabular}{lll}
    Date: & \examDate\\
    Hours & Beginning: {\examStartTime}  Ending: {\examEndTime} \\
    Duration: & \examLength \\
    Length in Pages: & \pageref{LastPage} (Title page included)\\
    %Exam Type: &  \\
    %Additional Materials Allowed: & One 8.5x11 double sided help sheet \\
    %	& \bf{NO CALCULATORS, NO ADDITIONAL MATERIAL} \\
\end{tabular}
}
\fi % End of \if\solution
}% End of \maketitle


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
