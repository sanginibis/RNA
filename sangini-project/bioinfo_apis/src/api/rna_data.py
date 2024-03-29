codon_table = {
    "UUU": "F", "UUC": "F", "UUA": "L", "UUG": "L",
    "UCU": "S", "UCC": "S", "UCA": "S", "UCG": "S",
    "UAU": "Y", "UAC": "Y", "UAA": "STOP", "UAG": "STOP",
    "UGU": "C", "UGC": "C", "UGA": "STOP", "UGG": "W",
    "CUU": "L", "CUC": "L", "CUA": "L", "CUG": "L",
    "CCU": "P", "CCC": "P", "CCA": "P", "CCG": "P",
    "CAU": "H", "CAC": "H", "CAA": "Q", "CAG": "Q",
    "CGU": "R", "CGC": "R", "CGA": "R", "CGG": "R",
    "AUU": "I", "AUC": "I", "AUA": "I", "AUG": "M",
    "ACU": "T", "ACC": "T", "ACA": "T", "ACG": "T",
    "AAU": "N", "AAC": "N", "AAA": "K", "AAG": "K",
    "AGU": "S", "AGC": "S", "AGA": "R", "AGG": "R",
    "GUU": "V", "GUC": "V", "GUA": "V", "GUG": "V",
    "GCU": "A", "GCC": "A", "GCA": "A", "GCG": "A",
    "GAU": "D", "GAC": "D", "GAA": "E", "GAG": "E",
    "GGU": "G", "GGC": "G", "GGA": "G", "GGG": "G"
}

reference_rscus = {
    "UUU": 1.52, "UUC": 1.52, "UUA": 0.48, "UUG": 0.48,
    "UCU": 1.44, "UCC": 1.44, "UCA": 0.56, "UCG": 0.56,
    "UAU": 1.46, "UAC": 1.46, "UAA": 0.0, "UAG": 0.0,
    "UGU": 1.44, "UGC": 1.44, "UGA": 0.0, "UGG": 1.12,
    "CUU": 0.48, "CUC": 0.48, "CUA": 1.52, "CUG": 1.52,
    "CCU": 0.56, "CCC": 0.56, "CCA": 1.44, "CCG": 1.44,
    "CAU": 0.54, "CAC": 0.54, "CAA": 1.46, "CAG": 1.46,
    "CGU": 0.44, "CGC": 0.44, "CGA": 1.56, "CGG": 1.56,
    "AUU": 1.56, "AUC": 1.56, "AUA": 0.44, "AUG": 1.0,
    "ACU": 1.44, "ACC": 1.44, "ACA": 0.56, "ACG": 0.56,
    "AAU": 1.46, "AAC": 1.46, "AAA": 0.54, "AAG": 0.54,
    "AGU": 0.44, "AGC": 0.44, "AGA": 1.56, "AGG": 1.56,
    "GUU": 0.48, "GUC": 0.48, "GUA": 1.52, "GUG": 1.52,
    "GCU": 0.56, "GCC": 0.56, "GCA": 1.44, "GCG": 1.44,
    "GAU": 1.46, "GAC": 1.46, "GAA": 0.54, "GAG": 0.54,
    "GGU": 1.52, "GGC": 1.52, "GGA": 0.48, "GGG": 0.48
}

codon_table_translator = {
  "UUU": { "code": "Phe", "name": "Phenylalanine", "codon": "UUU" },
  "UUC": { "code": "Phe", "name": "Phenylalanine", "codon": "UUC" },
  "UUA": { "code": "Leu", "name": "Leucine", "codon": "UUA" },
  "UUG": { "code": "Leu", "name": "Leucine", "codon": "UUG" },
  "CUU": { "code": "Leu", "name": "Leucine", "codon": "CUU" },
  "CUC": { "code": "Leu", "name": "Leucine", "codon": "CUC" },
  "CUA": { "code": "Leu", "name": "Leucine", "codon": "CUA" },
  "CUG": { "code": "Leu", "name": "Leucine", "codon": "CUG" },
  "AUU": { "code": "Ile", "name": "Isoleucine", "codon": "AUU" },
  "AUC": { "code": "Ile", "name": "Isoleucine", "codon": "AUC" },
  "AUA": { "code": "Ile", "name": "Isoleucine", "codon": "AUA" },
  "AUG": { "code": "Met", "name": "Methionine", "codon": "AUG" },
  "GUU": { "code": "Val", "name": "Valine", "codon": "GUU" },
  "GUC": { "code": "Val", "name": "Valine", "codon": "GUC" },
  "GUA": { "code": "Val", "name": "Valine", "codon": "GUA" },
  "GUG": { "code": "Val", "name": "Valine", "codon": "GUG" },
  "UCU": { "code": "Ser", "name": "Serine", "codon": "UCU" },
  "UCC": { "code": "Ser", "name": "Serine", "codon": "UCC" },
  "UCA": { "code": "Ser", "name": "Serine", "codon": "UCA" },
  "UCG": { "code": "Ser", "name": "Serine", "codon": "UCG" },
  "CCU": { "code": "Pro", "name": "Proline", "codon": "CCU" },
  "CCC": { "code": "Pro", "name": "Proline", "codon": "CCC" },
  "CCA": { "code": "Pro", "name": "Proline", "codon": "CCA" },
  "CCG": { "code": "Pro", "name": "Proline", "codon": "CCG" },
  "ACU": { "code": "Thr", "name": "Threonine", "codon": "ACU" },
  "ACC": { "code": "Thr", "name": "Threonine", "codon": "ACC" },
  "ACA": { "code": "Thr", "name": "Threonine", "codon": "ACA" },
  "ACG": { "code": "Thr", "name": "Threonine", "codon": "ACG" },
  "GCU": { "code": "Ala", "name": "Alanine", "codon": "GCU" },
  "GCC": { "code": "Ala", "name": "Alanine", "codon": "GCC" },
  "GCA": { "code": "Ala", "name": "Alanine", "codon": "GCA" },
  "GCG": { "code": "Ala", "name": "Alanine", "codon": "GCG" },
  "UAU": { "code": "Tyr", "name": "Tyrosine", "codon": "UAU" },
  "UAC": { "code": "Tyr", "name": "Tyrosine", "codon": "UAC" },
  "UAA": { "code": "Stop", "name": "Stop Codon", "codon": "UAA" },
  "UAG": { "code": "Stop", "name": "Stop Codon", "codon": "UAG" },
  "CAU": { "code": "His", "name": "Histidine", "codon": "CAU" },
  "CAC": { "code": "His", "name": "Histidine", "codon": "CAC" },
  "CAA": { "code": "Gln", "name": "Glutamine", "codon": "CAA" },
  "CAG": { "code": "Gln", "name": "Glutamine", "codon": "CAG" },
  "AAU": { "code": "Asn", "name": "Asparagine", "codon": "AAU" },
  "AAC": { "code": "Asn", "name": "Asparagine", "codon": "AAC" },
  "AAA": { "code": "Lys", "name": "Lysine", "codon": "AAA" },
  "AAG": { "code": "Lys", "name": "Lysine", "codon": "AAG" },
  "GAU": { "code": "Asp", "name": "Aspartic Acid", "codon": "GAU" },
  "GAC": { "code": "Asp", "name": "Aspartic Acid", "codon": "GAC" },
  "GAA": { "code": "Glu", "name": "Glutamic Acid", "codon": "GAA" },
  "GAG": { "code": "Glu", "name": "Glutamic Acid", "codon": "GAG" },
  "UGU": { "code": "Cys", "name": "Cysteine", "codon": "UGU" },
  "UGC": { "code": "Cys", "name": "Cysteine", "codon": "UGC" },
  "UGA": { "code": "Stop", "name": "Stop Codon", "codon": "UGA" },
  "UGG": { "code": "Trp", "name": "Tryptophan", "codon": "UGG" },
  "CGU": { "code": "Arg", "name": "Arginine", "codon": "CGU" },
  "CGC": { "code": "Arg", "name": "Arginine", "codon": "CGC" },
  "CGA": { "code": "Arg", "name": "Arginine", "codon": "CGA" },
  "CGG": { "code": "Arg", "name": "Arginine", "codon": "CGG" },
  "AGU": { "code": "Ser", "name": "Serine", "codon": "AGU" },
  "AGC": { "code": "Ser", "name": "Serine", "codon": "AGC" },
  "AGA": { "code": "Arg", "name": "Arginine", "codon": "AGA" },
  "AGG": { "code": "Arg", "name": "Arginine", "codon": "AGG" },
  "GGU": { "code": "Gly", "name": "Glycine", "codon": "GGU" },
  "GGC": { "code": "Gly", "name": "Glycine", "codon": "GGC" },
  "GGA": { "code": "Gly", "name": "Glycine", "codon": "GGA" },
  "GGG": { "code": "Gly", "name": "Glycine", "codon": "GGG" }
}
