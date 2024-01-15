import json
import math
from api.rna_data import reference_rscus
from api.rna_data import codon_table

from tests.test_data import rna_test_data

class CodonBiasAnalyzer:
    """
    Class for analyzing codon bias in RNA sequences.

    Attributes:
        codon_table (dict): A dictionary mapping codons to their corresponding amino acids.

    Methods:
        analyze_codon_bias(rna_sequence): Analyzes the codon bias of a given RNA sequence.
        generate_json_output(analysis_results): Generates a JSON representation of the analysis results.
    """

    def __init__(self):
        """
        Initializes a CodonBiasAnalyzer object with a standard codon table.
        """
        self.codon_table = codon_table

    def analyze_codon_bias(self, rna_sequence):
        """
        Analyzes the codon bias of a given RNA sequence.

        Args:
            rna_sequence (str): The RNA sequence to analyze.

        Returns:
            dict: A dictionary containing the codon bias analysis results, including:
                - codon_counts: A dictionary of codon counts.
                - RSCU: A dictionary of RSCU values.
                - CAI: The Codon Adaptation Index.
                - ENC: The Effective Number of Codons.
        """

        codon_counts = {}
        for codon in self.codon_table.keys():
            codon_counts[codon] = rna_sequence.count(codon)

        rscu = {}
        for amino_acid in set(self.codon_table.values()):
            synonymous_codons = [
                codon for codon, aa in self.codon_table.items() if aa == amino_acid]
            total_synonymous_count = sum(
                codon_counts[codon] for codon in synonymous_codons)
            for codon in synonymous_codons:
                if len(synonymous_codons) > 0:
                    if total_synonymous_count * len(synonymous_codons) > 0:
                        rscu[codon] = codon_counts[codon] / \
                            total_synonymous_count * len(synonymous_codons)

        cai = self.calculate_cai(rscu)
        enc = self.calculate_enc(codon_counts)

        return {
            # "codon_counts": codon_counts,
            # "RSCU": rscu,
            "ENC": enc,
            "CAI": cai
        }

    def calculate_cai(self, rscu, reference_rscu=None):
        """
        Calculates the Codon Adaptation Index (CAI).

        Args:
            rscu (dict): A dictionary of RSCU values for the sequence.
            reference_rscu (dict, optional): A dictionary of RSCU values for a reference set of highly expressed genes.
                                            If not provided, a default reference set will be used.

        Returns:
            float: The CAI value.
        """
        cai = 0.0
        w = 0.0

        if reference_rscu is None:
            reference_rscu = reference_rscus

        try:
            w = sum(math.log(reference_rscu.get(codon, 1))
                    for codon in rscu.keys())
        except:
            pass

        n = sum(rscu.values())

        try:
            cai = (1 / n) * sum(rscu[codon] * math.log(reference_rscu.get(codon, 1))
                                for codon in rscu.keys())
            cai = cai / w
        except ZeroDivisionError:
            cai = 0.0
        except:
            cai = 0.0

        
        return cai

    def calculate_enc(self, codon_counts):
        """
        Calculates the Effective Number of Codons (ENC).

        Args:
            codon_counts (dict): A dictionary of codon counts for the sequence.

        Returns:
            float: The ENC value.
        """

        f2 = sum(count**2 for count in codon_counts.values())
        n = sum(codon_counts.values())
        enc = 2 + 9 * f2 / (n * (n - 1))
        return enc


# for self testing the class
if __name__ == '__main__':

    CBA = CodonBiasAnalyzer()

    for entry in rna_test_data:
        print(CBA.analyze_codon_bias(entry["RNASequence"]))
