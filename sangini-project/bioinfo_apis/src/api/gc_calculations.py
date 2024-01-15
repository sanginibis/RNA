from Bio.SeqUtils import gc_fraction
from Bio.SeqUtils import GC123
from Bio.SeqUtils import molecular_weight

from tests.test_data import rna_test_data


class GCCalculations:

    def get_gc_fraction(self, rnaSeq):
        """Returns the G+C fraction usages in the sequence"""
        return gc_fraction(rnaSeq)

    def get_gc_content_for_123(self, rnaSeq):
        """Returns the G+C content i.e. total, for first, second and third positions"""
        gc_list = list(GC123(rnaSeq))
        return gc_list
 
    def get_gc_molecular_weight(self, rnaSeq):
        """Returns the molecular mass of RNA sequences as float."""
        gc_list = list(GC123(rnaSeq))
        return molecular_weight(rnaSeq,"RNA")

# for self testing the class
if __name__ == '__main__':
    
    GCC = GCCalculations()

    print("")

    # test all the G+C calculations for the rna test data
    print("--------- G+C Fraction ------------")
    for entry in rna_test_data:
        print(GCC.get_gc_fraction(entry["RNASequence"]))
    print("")

    # test all the G+C content for 123
    print("--------- G+C 123 content ------------")
    for entry in rna_test_data:
        print(GCC.get_gc_content_for_123(entry["RNASequence"]))
    print("")

    # test all the molecular weight
    print("--------- Molecular Weight ------------")
    for entry in rna_test_data:
        print(GCC.get_gc_molecular_weight(entry["RNASequence"]))
    print("")
