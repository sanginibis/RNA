# https://bayesianneuron.com/2019/02/nussinov-predict-2nd-rna-fold-structure-algorithm/

"""
Nussinov-Jacobson python algorithm implementation
	Predicts the secondary RNA structure from an RNA sequence.
	The minimal loop length is set to a default of 0
"""
import numpy as np
from tests.test_data import rna_test_data

class NussinovPredictedStructure:
	def couple(self,pair):
		"""
		Return True if RNA nucleotides are Watson-Crick base pairs
		"""
		pairs = {"A": "U", "U": "A", "G": "C", "C": "G"}  # ...or a list of tuples...

		# check if pair is couplable
		if pair in pairs.items():
			return True

		return False

	def fill(self, nm, rna):
		"""
		Fill the matrix as per the Nussinov algorithm
		"""
		minimal_loop_length = 0

		for k in range(1, len(rna)):
			for i in range(len(rna) - k):
				j = i + k

				if j - i >= minimal_loop_length:
					down = nm[i + 1][j]  # 1st rule
					left = nm[i][j - 1]  # 2nd rule
					diag = nm[i + 1][j - 1] + self.couple((rna[i], rna[j]))  # 3rd rule

					rc = max([nm[i][t] + nm[t + 1][j] for t in range(i, j)])  # 4th rule

					nm[i][j] = max(down, left, diag, rc)  # max of all

				else:
					nm[i][j] = 0

		return nm

	def traceback(self, nm, rna, fold, i, L):
		"""
		Traceback through complete Nussinov matrix to find optimial RNA secondary structure solution through max base-pairs
		"""
		j = L

		if i < j:
			if nm[i][j] == nm[i + 1][j]:  # 1st rule
				self.traceback(nm, rna, fold, i + 1, j)
			elif nm[i][j] == nm[i][j - 1]:  # 2nd rule
				self.traceback(nm, rna, fold, i, j - 1)
			# 3rd rule
			elif nm[i][j] == nm[i + 1][j - 1] + self.couple((rna[i], rna[j])):
				fold.append((i, j))
				self.traceback(nm, rna, fold, i + 1, j - 1)
			else:
				for k in range(i + 1, j - 1):
					if nm[i][j] == nm[i, k] + nm[k + 1][j]:  # 4th rule
						self.traceback(nm, rna, fold, i, k)
						self.traceback(nm, rna, fold, k + 1, j)
						break

		return fold

	def dot_write(self, rna, fold):
		dot = ["." for i in range(len(rna))]

		for s in fold:
			# print(min(s), max(s))
			dot[min(s)] = "("
			dot[max(s)] = ")"

		return "".join(dot)

	def init_matrix(self, rna):
		M = len(rna)

		# init matrix
		nm = np.empty([M, M])
		nm[:] = np.NAN

		# init diaganols to 0
		# few ways to do this: np.fill_diaganol(), np.diag(), nested loop, ...
		nm[range(M), range(M)] = 0
		nm[range(1, len(rna)), range(len(rna) - 1)] = 0

		return nm

	def get_predicted_structure(self, rna):
		nm = self.init_matrix(rna)
		nm = self.fill(nm, rna)

		fold = []
		sec = self.traceback(nm, rna, fold, 0, len(rna) - 1)

		res = self.dot_write(rna, fold)

		return res

if __name__ == "__main__":

	NPS = NussinovPredictedStructure()

	for entry in rna_test_data:
		rna = entry["RNASequence"]
		print(NPS.get_predicted_structure(rna))
