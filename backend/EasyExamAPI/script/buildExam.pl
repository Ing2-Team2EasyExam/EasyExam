#!/usr/bin/perl

# Given as a parameter the name (without the extension) of a latex
# file "foo1" which starts by a line of the format
# "\documentclass[foo1,foo2,foo3]{foo}"

# Creates similar latex files "foo1_tas.tex", "foo1_students.tex" and
# "foo1_solution.tex", but starting with a line of format
# "\documentclass[solution,markingScheme]{foo}",
# "\documentclass{project}" and "\documentclass[solution]{foo}",
# compile them and produce the correspondinf postscript files.

use File::Basename;
use strict;

if ( @ARGV != 1 ) {
    die("Usage: $0 <assignment_or_project_file.tex>\n");
}

my $fname = $ARGV[0];
my $line;
my $name;
my $path;
my $suffix;
my @suffixlist;

my $st = "_normal";
my $sol = "_solution";


$fname =~ s/\.tex$//;
($name,$path,$suffix) = fileparse($fname,@suffixlist);
my $base = basename($fname,@suffixlist);

open (FILE, "$fname.tex") or die ("Cannot open file $fname.tex");
open (FILE_ST, ">${base}${st}.tex") or die ("Cannot open file ${base}${st}.tex");
open (FILE_SOL, ">${base}${sol}.tex") or die ("Cannot open file ${base}${sol}.tex");
while ($line = <FILE>)
  {
      if ($line =~ m/^\\documentclass.*\{(\w+)\}/)
      {
	  print FILE_ST "\\documentclass\[spaceForAnswer,markingScheme\]\{$1\}\n";
	  print FILE_SOL "\\documentclass\[solution,markingScheme,authorship,suggestedMarkingScheme\]\{$1\}\n";
      }
      else
      {
	  print FILE_ST $line;
	  print FILE_SOL $line;
      }
  }

close (FILE);
close (FILE_ST);
close (FILE_SOL);

print "** Compiling ${fname}${st}.tex\n";
system("pdflatex -file-line-error -halt-on-error ${base}${st}.tex -o ${base}${st}.pdf") == 0 or die "$?";
system("pdflatex -file-line-error -halt-on-error ${base}${st}.tex -o ${base}${st}.pdf") == 0 or die "$?";

print "Compiling ${fname}${sol}.tex\n";
system("pdflatex -file-line-error -halt-on-error ${base}${sol}.tex -o ${base}${sol}.pdf") == 0 or die "$?";
system("pdflatex -file-line-error -halt-on-error ${base}${sol}.tex -o ${base}${sol}.pdf") == 0 or die "$?";

print "Erasing non-necessary generated files.\n";
system("rm -f ${base}_*.ps; rm -f ${base}_*.tex; rm -f ${base}_*.aux; rm -f ${base}_*.log; rm -f ${base}_*.dvi;rm -f ${base}_*.toc;");
