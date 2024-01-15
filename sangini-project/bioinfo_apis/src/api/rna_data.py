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