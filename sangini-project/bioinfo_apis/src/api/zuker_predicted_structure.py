from seqfold import fold, dg, dg_cache, dot_bracket
from tests.test_data import rna_test_data

"""
Uses seqfold to get Zuker prediction.
Predict the minimum free energy structure of nucleic acids.

seqfold is an implementation of the Zuker, 1981 dynamic programming algorithm, 
the basis for UNAFold/mfold, with energy functions from SantaLucia, 2004 (DNA) and Turner, 2009 (RNA).
https://github.com/Lattice-Automation/seqfold
"""

class ZukerPredictedStructure:

    def dot_write(self, rnaSequence):
        # `fold` returns a list of `seqfold.Struct` from the minimum free energy structure
        structs = fold(seq=rnaSequence)
        return dot_bracket(seq=rnaSequence, structs=structs)

    def get_predicted_structure(self, rna):
        return self.dot_write(rna)

if __name__ == "__main__":

    ZPS = ZukerPredictedStructure()

    for entry in rna_test_data:
        rna = entry["RNASequence"]
        print(ZPS.dot_write(rna))
