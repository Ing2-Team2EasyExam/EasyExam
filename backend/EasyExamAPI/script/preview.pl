#!/usr/bin/perl

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

$fname =~ s/\.tex$//;
($name,$path,$suffix) = fileparse($fname,@suffixlist);
my $base = basename($fname,@suffixlist);

print "** Compiling ${base}.tex\n";
system("latex -file-line-error -halt-on-error ${base}.tex && dvips ${base}.dvi -o ${base}.ps && ps2pdf ${base}.ps") == 0 or die "$?";


print "Erasing non-necessary generated files.\n";
system("rm -f ${base}.ps; rm -f ${base}.tex; rm -f ${base}.aux; rm -f ${base}.log; rm -f ${base}.dvi; rm -f ${base}.toc;");
